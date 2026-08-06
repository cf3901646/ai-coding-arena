/* =========================================================
   Scenario page rendering
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyChartDefaults();

  const id = document.body.dataset.scenario;
  const scenario = SCENARIOS.find((s) => s.id === id);
  if (!scenario) return;

  renderPageHead(scenario);

  if (!scenarioHasData(id)) {
    renderEmpty(scenario);
    renderFooter();
    return;
  }

  renderDemos(scenario);
  renderScenarioTable(scenario);
  renderScenarioRadar(scenario);
  renderFooter();
});

/* ---------- Head ---------- */
function renderPageHead(scenario) {
  const el = document.getElementById("page-head");
  if (!el) return;

  const idx = SCENARIOS.findIndex((s) => s.id === scenario.id) + 1;
  el.innerHTML = `
    <div class="wrap">
      <div class="crumb"><a href="../index.html">总览</a><span>/</span><span>场景 ${String(
        idx
      ).padStart(2, "0")}</span></div>
      <h1>${scenario.title}</h1>
      <p class="lede">${scenario.desc}</p>
      ${
        scenario.prompt
          ? `<div class="prompt-box"><div class="k">下发给 4 个模型的同一条指令</div><p>“${scenario.prompt}”</p></div>`
          : ""
      }
    </div>`;
}

/* ---------- Empty ---------- */
function renderEmpty(scenario) {
  const el = document.getElementById("scenario-body");
  if (!el) return;

  el.innerHTML = `
    <section class="section">
      <div class="wrap">
        <div class="empty">
          <div class="glyph">评测进行中</div>
          <h3>${scenario.title}</h3>
          <p>四个模型的产出尚未采集完成。完成后此处会出现可直接在页面内试用的 Demo、评分明细与能力雷达图。</p>
          <div style="margin-top:22px"><a class="btn" href="../index.html">← 返回总览</a></div>
        </div>
      </div>
    </section>`;
}

/* ---------- Demos ---------- */
function renderDemos(scenario) {
  const el = document.getElementById("demo-list");
  if (!el) return;

  const perMax = CRITERIA.length * 10;

  el.innerHTML = scenarioRanking(scenario.id)
    .map((row, i) => {
      const { ai, rec, total } = row;
      const path = "../" + rec.demoPath;
      const pros = (rec.pros || [])
        .map((p) => `<span class="pill good">${p}</span>`)
        .join("");
      const cons = (rec.cons || [])
        .map((c) => `<span class="pill bad">${c}</span>`)
        .join("");

      const scoreRows = CRITERIA.map((c) => {
        const v = rec.criteria[c.key] || 0;
        return `
        <div class="score-row">
          <span>${c.label}</span>
          <span class="meter"><i style="width:${v * 10}%;background:${
          ai.color
        }"></i></span>
          <b>${v}</b>
        </div>`;
      }).join("");

      return `
      <article class="demo ${i === 0 ? "is-first" : ""}">
        <div class="demo-head">
          <span class="rank">${i === 0 ? "第 1 名" : "第 " + (i + 1) + " 名"}</span>
          <h3><i class="dot" style="background:${ai.color}"></i>${ai.name}</h3>
          <span class="vendor">${ai.vendor}</span>
          <span class="spacer"></span>
          <a class="btn btn-sm" href="${path}" target="_blank" rel="noopener">全屏打开 ↗</a>
        </div>

        <div class="demo-metrics">
          <div class="metric"><div class="k">总分</div><div class="v" style="color:${
            ai.color
          }">${total}<small> / ${perMax}</small></div></div>
          <div class="metric"><div class="k">耗时</div><div class="v">${
            rec.timeSpent
          }</div></div>
          <div class="metric" style="flex:1;min-width:200px"><div class="k">产出</div><div class="v" style="font-size:13.5px;font-weight:400;line-height:1.5;letter-spacing:0">${
            rec.files
          }</div></div>
        </div>

        <div class="demo-body">
          <div class="demo-frame">
            <iframe src="${path}" title="${ai.name} — ${scenario.title}"
              loading="lazy"
              allow="fullscreen; autoplay; gamepad; pointer-lock"
              allowfullscreen></iframe>
          </div>
          <div class="demo-side">
            <p class="review">${rec.notes}</p>
            ${
              pros || cons
                ? `<div class="pill-list">${pros}${cons}</div>`
                : ""
            }
            <div class="score-rows">${scoreRows}</div>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- Table ---------- */
function renderScenarioTable(scenario) {
  const el = document.getElementById("scenario-table");
  if (!el) return;

  const perMax = CRITERIA.length * 10;
  const head = `
    <tr>
      <th>模型</th>
      ${CRITERIA.map((c) => `<th>${c.label}</th>`).join("")}
      <th>总分</th>
      <th>耗时</th>
    </tr>`;

  const body = scenarioRanking(scenario.id)
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
      ${CRITERIA.map((c) => `<td>${r.rec.criteria[c.key] || 0}</td>`).join("")}
      <td class="total">${r.total}<span style="opacity:.4;font-weight:400"> / ${perMax}</span></td>
      <td>${r.rec.timeSpent}</td>
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
    <div class="table-note">每项维度满分 10 分，单场景满分 ${perMax} 分。排名按总分降序。</div>`;
}

/* ---------- Radar ---------- */
function renderScenarioRadar(scenario) {
  const cv = document.getElementById("scenario-radar");
  if (!cv || typeof Chart === "undefined") return;

  const datasets = makeRadarDatasets(
    (aiId, key) => (((SCORES[scenario.id] || {})[aiId] || {}).criteria || {})[key] || 0,
    scenarioAIs(scenario.id)
  );
  new Chart(cv, buildRadarConfig(datasets));
}
