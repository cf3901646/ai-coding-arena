/* =========================================================
   Home page rendering
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyChartDefaults();
  renderHeroStats();
  renderVerdict();
  renderPodium();
  renderScenarioCards();
  renderOverallTable();
  renderRadar();
  renderCriteria();
  renderFooter();
});

/* ---------- Hero stats ---------- */
function renderHeroStats() {
  const el = document.getElementById("hero-stats");
  if (!el) return;

  const rated = ratedScenarios();
  const rank = overallRanking();
  const top = rank[0];
  const fastest = AIS.map((ai) => {
    const mins = rated
      .map((s) => (SCORES[s.id][ai.id] || {}).minutes)
      .filter((m) => typeof m === "number");
    return { ai, mins: mins.length ? Math.min(...mins) : Infinity };
  }).sort((a, b) => a.mins - b.mins)[0];

  el.innerHTML = `
    <div class="hero-stat"><dt>参评模型</dt><dd>${AIS.length}</dd></div>
    <div class="hero-stat"><dt>测试场景</dt><dd>${rated.length}<small>/ ${SCENARIOS.length}</small></dd></div>
    <div class="hero-stat"><dt>综合第一</dt><dd style="font-size:22px">${top.ai.name}</dd></div>
    <div class="hero-stat"><dt>出图最快</dt><dd style="font-size:22px">${
      fastest && fastest.mins !== Infinity ? fastest.ai.name : "—"
    }</dd></div>`;
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
      const rated = ratedScenarios().length;
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
        rated * perMax
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
      ${rated.map((s) => `<th>${s.title}</th>`).join("")}
      <th>总分</th>
      <th>得分率</th>
    </tr>`;

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
        .map((v) => `<td>${v}<span style="opacity:.4"> / ${perMax}</span></td>`)
        .join("")}
      <td class="total">${r.total}</td>
      <td>${r.pct.toFixed(0)}%</td>
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
    <div class="table-note">总分 = 已完成场景的 ${CRITERIA.length} 项维度得分之和，单场景满分 ${perMax} 分。仅统计已完成评测的 ${rated.length} 个场景。</div>`;
}

/* ---------- Radar ---------- */
function renderRadar() {
  const cv = document.getElementById("overall-radar");
  if (!cv || typeof Chart === "undefined") return;

  const rated = ratedScenarios();
  if (!rated.length) return;

  const datasets = makeRadarDatasets((aiId, key) => {
    const sum = rated.reduce(
      (acc, s) => acc + (SCORES[s.id][aiId].criteria[key] || 0),
      0
    );
    return +(sum / rated.length).toFixed(1);
  });

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
