/* =========================================================
   Home page rendering
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyChartDefaults();
  renderHeroStats();
  renderVerdict();
  renderPodium();
  renderRecap();
  renderDeepDive();
  renderScenarioCards();
  renderOverallTable();
  renderRadar();
  renderCriteria();
  renderOneMoreThing();
  renderFooter();
});

/* ---------- Hero stats ---------- */
function renderHeroStats() {
  const el = document.getElementById("hero-stats");
  if (!el) return;

  const rated = ratedScenarios();
  const rank = overallRanking();
  const top = rank[0];

  const totalMins = (aiId) =>
    rated
      .filter((s) => isParticipant(s.id, aiId))
      .map((s) => ((SCORES[s.id] || {})[aiId] || {}).minutes)
      .filter((m) => typeof m === "number")
      .reduce((a, b) => a + b, 0);

  const withTime = rank.filter((r) => totalMins(r.ai.id) > 0);
  // 时间性价比 = 每分钟拿到的分数
  const bestValue = withTime
    .slice()
    .sort((a, b) => b.total / totalMins(b.ai.id) - a.total / totalMins(a.ai.id))[0];

  el.innerHTML = `
    <div class="hero-stat"><dt>参评模型</dt><dd>${rank.length}</dd></div>
    <div class="hero-stat"><dt>测试场景</dt><dd>${rated.length}<small>/ ${SCENARIOS.length}</small></dd></div>
    <div class="hero-stat"><dt>质量第一</dt><dd style="font-size:22px">${
      top ? top.ai.name : "—"
    }<small>${
    top ? " " + top.pct.toFixed(0) + "% · " + totalMins(top.ai.id) + " 分钟" : ""
  }</small></dd></div>
    <div class="hero-stat"><dt>效率第一</dt><dd style="font-size:22px">${
      bestValue ? bestValue.ai.name : "—"
    }<small>${
    bestValue
      ? " " + bestValue.pct.toFixed(0) + "% · " + totalMins(bestValue.ai.id) + " 分钟"
      : ""
  }</small></dd></div>`;
}

/* ---------- Verdict ---------- */
function renderVerdict() {
  const el = document.getElementById("verdict");
  if (!el) return;

  el.innerHTML = `
    <div class="verdict-main">
      <p class="quote">${SUMMARY.headline.replace(
        /Kiro/g,
        "<strong>Kiro</strong>"
      )}</p>
      <div class="verdict-notes">
        <div class="verdict-note"><b>结论依据</b><span>${SUMMARY.body}</span></div>
        <div class="verdict-note"><b>选型建议</b><span>${SUMMARY.recommendation}</span></div>
        <div class="verdict-note"><b>数据范围</b><span>${SUMMARY.caveat}</span></div>
      </div>
    </div>
    <div>
      <p class="section-label">综合排名</p>
      <div class="podium" id="podium"></div>
    </div>`;
}

/* ---------- Podium ---------- */
function renderPodium() {
  const el = document.getElementById("podium");
  if (!el) return;

  el.innerHTML = overallRanking()
    .map((r, i) => {
      const perMax = CRITERIA.length * 10;
      return `
      <div class="podium-row ${i === 0 ? "is-first" : ""}">
        <span class="podium-rank">${String(i + 1).padStart(2, "0")}</span>
        <span class="podium-name">
          <i class="dot" style="background:${r.ai.color}"></i>
          ${r.ai.name}
          <span class="sub">${r.ai.vendor}</span>
        </span>
        <span class="podium-score">${r.total}<small> / ${
        r.joined * perMax
      }</small></span>
      </div>`;
    })
    .join("");
}

/* ---------- Scenario cards ---------- */
function renderScenarioCards() {
  const el = document.getElementById("scenario-grid");
  if (!el) return;

  el.innerHTML = SCENARIOS.map((s, i) => {
    const has = scenarioHasData(s.id);
    const winner = has ? scenarioRanking(s.id)[0] : null;
    return `
    <a class="scenario-card" href="${s.page}">
      <span class="idx">场景 ${String(i + 1).padStart(2, "0")}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="foot">
        ${
          winner
            ? `<span class="winner-chip"><i class="dot" style="background:${winner.ai.color}"></i>领先 · ${winner.ai.name}</span>`
            : `<span class="badge">待评测</span>`
        }
        <span class="arrow">→</span>
      </div>
    </a>`;
  }).join("");
}

/* ---------- Overall table ---------- */
function renderOverallTable() {
  const el = document.getElementById("overall-table");
  if (!el) return;

  const rated = ratedScenarios();
  const rank = overallRanking();
  const perMax = CRITERIA.length * 10;

  const head = `
    <tr>
      <th>模型</th>
      ${rated.map((s) => `<th>${s.short || s.title}</th>`).join("")}
      <th>总分</th>
      <th>耗时</th>
    </tr>`;

  const minsOf = (aiId) =>
    rated
      .filter((s) => isParticipant(s.id, aiId))
      .map((s) => ((SCORES[s.id] || {})[aiId] || {}).minutes)
      .filter((m) => typeof m === "number")
      .reduce((a, b) => a + b, 0);

  const body = rank
    .map(
      (r, i) => `
    <tr class="${i === 0 ? "is-first" : ""}">
      <td class="name">
        <span class="cell-name">
          <span class="rank-num">${i + 1}</span>
          <i class="dot" style="background:${r.ai.color}"></i>
          ${r.ai.name}
        </span>
      </td>
      ${r.perScenario
        .map((v) =>
          v === null
            ? `<td style="opacity:.35">未参赛</td>`
            : `<td>${v}<span style="opacity:.4"> / ${perMax}</span></td>`
        )
        .join("")}
      <td class="total">${r.total}<span style="opacity:.4"> / ${r.max}</span><br><span style="opacity:.5;font-size:11px;font-weight:600">${r.pct.toFixed(
        0
      )}%</span></td>
      <td>${minsOf(r.ai.id) ? minsOf(r.ai.id) + "<span style=\"opacity:.4\"> 分钟</span>" : "—"}</td>
    </tr>`
    )
    .join("");

  el.innerHTML = `
    <div class="table-scroll">
      <table class="data">
        <thead>${head}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>
    <div class="table-note">单场景满分 ${perMax} 分（${CRITERIA.length} 项维度 × 10）。四个模型在三个场景中阵容一致，总分可直接比较。耗时为三场累计的实际生成时长，不计入总分，供评估投入产出比参考。</div>`;
}

/* ---------- Radar ---------- */
function renderRadar() {
  const cv = document.getElementById("overall-radar");
  if (!cv || typeof Chart === "undefined") return;

  const rated = ratedScenarios();
  if (!rated.length) return;

  const ranked = overallRanking();
  const datasets = makeRadarDatasets((aiId, key) => {
    const joined = rated.filter((s) => isParticipant(s.id, aiId));
    if (!joined.length) return 0;
    const sum = joined.reduce(
      (acc, s) => acc + ((((SCORES[s.id] || {})[aiId] || {}).criteria || {})[key] || 0),
      0
    );
    return +(sum / joined.length).toFixed(1);
  }, ranked.map((r) => r.ai));

  new Chart(cv, buildRadarConfig(datasets));
}

/* ---------- Criteria ---------- */
function renderCriteria() {
  const el = document.getElementById("criteria-grid");
  if (!el) return;

  el.innerHTML = CRITERIA.map(
    (c, i) => `
    <div class="criterion">
      <div class="k">${String(i + 1).padStart(2, "0")} · 满分 10</div>
      <h4>${c.label}</h4>
      <p>${c.desc || ""}</p>
    </div>`
  ).join("");
}

/* ---------- Recap: 逐场总结 ---------- */
function renderRecap() {
  const el = document.getElementById("recap");
  if (!el || typeof RECAP === "undefined") return;

  el.innerHTML = RECAP.map((r) => {
    const rank = scenarioHasData(r.id) ? scenarioRanking(r.id) : [];
    const win = rank[0];
    const mini = rank
      .map(
        (row) =>
          `<span>${row.ai.name}<b>${row.total}</b></span>`
      )
      .join("");

    return `
    <article class="recap-item">
      <div class="recap-aside">
        <div class="k">${r.label}</div>
        <h3>${r.title}</h3>
        ${
          win
            ? `<span class="winner"><i class="dot" style="background:${win.ai.color}"></i>领先 · ${win.ai.name}</span>`
            : ""
        }
        <div class="rank-mini">${mini}</div>
      </div>
      <div class="recap-body">
        ${r.paras.map((p) => `<p>${p}</p>`).join("")}
        ${r.tag ? `<span class="tag">${r.tag}</span>` : ""}
      </div>
    </article>`;
  }).join("");
}

/* ---------- Deep dive: Kiro 为什么慢 ---------- */
function renderDeepDive() {
  if (typeof DEEP_DIVE === "undefined") return;
  const d = DEEP_DIVE;

  const set = (id, v) => {
    const n = document.getElementById(id);
    if (n) n.innerHTML = v;
  };
  set("dive-label", d.label);
  set("dive-title", d.title);
  set("dive-lede", d.lede);

  const el = document.getElementById("dive");
  if (!el) return;

  el.innerHTML = `
    <div class="dive-main">
      ${d.intro.map((p) => `<p>${p}</p>`).join("")}
      <div class="dive-steps">
        ${d.steps
          .map(
            (s) => `
          <div class="dive-step">
            <i>${s.n}</i>
            <div><b>${s.title}</b><span>${s.desc}</span></div>
          </div>`
          )
          .join("")}
      </div>
      ${d.outro.map((p) => `<p>${p}</p>`).join("")}
    </div>
    <div class="dive-side">
      <div class="dive-card">
        <div class="k">Kiro · 本次配置</div>
        <dl style="margin:0">
          ${d.specs
            .map(
              (s) =>
                `<div class="spec-row"><dt>${s.k}</dt><dd class="${
                  s.same ? "same" : ""
                }">${s.v}</dd></div>`
            )
            .join("")}
        </dl>
      </div>
      ${d.cards
        .map(
          (c) => `
        <div class="dive-card">
          <div class="k">${c.k}</div>
          <h4>${c.title}</h4>
          <p>${c.desc}</p>
        </div>`
        )
        .join("")}
    </div>`;
}

/* ---------- One more thing ---------- */
function renderOneMoreThing() {
  if (typeof ONE_MORE_THING === "undefined") return;
  const o = ONE_MORE_THING;

  const set = (id, v) => {
    const n = document.getElementById(id);
    if (n) n.innerHTML = v;
  };
  set("omt-kicker", o.kicker);
  set("omt-title", o.title);
  set("omt-lede", o.lede);

  const el = document.getElementById("omt-body");
  if (!el) return;

  el.innerHTML = `
    <dl class="omt-meta">
      ${o.meta.map((m) => `<div><dt>${m.k}</dt><dd>${m.v}</dd></div>`).join("")}
    </dl>

    <div class="omt-stage">
      <div class="omt-bar">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="addr">${o.addr}</span>
        <a class="btn btn-sm" href="${o.demoPath}" target="_blank" rel="noopener">全屏打开 ↗</a>
      </div>
      <iframe class="omt-frame" src="${o.demoPath}" loading="lazy"
        title="Copilot Studio · Opus 5 Max — 飞利浦编年史"></iframe>
      ${o.disclaimer ? `<div class="demo-disclaimer">${o.disclaimer}</div>` : ""}
    </div>

    <div class="omt-notes">
      ${o.notes
        .map((n) => `<div class="omt-note"><b>${n.title}</b><p>${n.desc}</p></div>`)
        .join("")}
    </div>

    <div class="omt-closing">${o.closing}</div>`;
}
