/**
 * 通用渲染逻辑：首页总览雷达图 + 汇总表；场景页由 scenario.js 单独处理
 * 依赖 scores-data.js 提供的 AIS / SCENARIOS / CRITERIA / SCORES / SUMMARY
 */

function computeOverallAverage(aiId) {
  let total = 0, count = 0;
  SCENARIOS.forEach((sc) => {
    const rec = SCORES[sc.id] && SCORES[sc.id][aiId];
    if (!rec) return;
    CRITERIA.forEach((c) => {
      total += rec.criteria[c.key] || 0;
      count++;
    });
  });
  return count ? +(total / count).toFixed(2) : 0;
}

function computeCriterionAverage(aiId, criterionKey) {
  let total = 0, count = 0;
  SCENARIOS.forEach((sc) => {
    const rec = SCORES[sc.id] && SCORES[sc.id][aiId];
    if (!rec) return;
    total += rec.criteria[criterionKey] || 0;
    count++;
  });
  return count ? +(total / count).toFixed(2) : 0;
}

function renderSummary() {
  const el = document.getElementById("summary-content");
  if (!el) return;
  el.innerHTML = `
    <p>${SUMMARY.headline}</p>
    <p><strong>推荐：</strong>${SUMMARY.recommendation}</p>
  `;
}

function renderScenarioCards() {
  const el = document.getElementById("scenario-grid");
  if (!el) return;
  el.innerHTML = SCENARIOS.map((sc) => `
    <div class="card">
      <h3>${sc.title}</h3>
      <p class="desc">${sc.desc}</p>
      <a class="link-btn" href="${sc.page}">查看4个AI对比 →</a>
    </div>
  `).join("");
}

function renderOverallTable() {
  const el = document.getElementById("overall-table");
  if (!el) return;

  // 按综合平均分从高到低排序 AI 列顺序，方便直接看出名次
  const rankedAis = [...AIS].sort(
    (a, b) => computeOverallAverage(b.id) - computeOverallAverage(a.id)
  );

  const medals = ["🥇", "🥈", "🥉"];
  const rankRow = `<tr><td>排名</td>${rankedAis
    .map((ai, i) => `<td>${medals[i] || i + 1}</td>`)
    .join("")}</tr>`;

  const rows = CRITERIA.map((c) => {
    const cells = rankedAis
      .map((ai) => `<td>${computeCriterionAverage(ai.id, c.key)}</td>`)
      .join("");
    return `<tr><td>${c.label}</td>${cells}</tr>`;
  }).join("");

  const totalRow = `<tr style="font-weight:700;"><td>综合平均分</td>${rankedAis
    .map((ai) => `<td>${computeOverallAverage(ai.id)}</td>`)
    .join("")}</tr>`;

  el.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr><th>评分维度</th>${rankedAis.map((ai) => `<th>${ai.name}</th>`).join("")}</tr>
      </thead>
      <tbody>${rankRow}${rows}${totalRow}</tbody>
    </table>
  `;
}

function renderRadarChart() {
  const canvas = document.getElementById("radarChart");
  if (!canvas || typeof Chart === "undefined") return;
  const datasets = AIS.map((ai) => ({
    label: ai.name,
    data: CRITERIA.map((c) => computeCriterionAverage(ai.id, c.key)),
    borderColor: ai.color,
    backgroundColor: ai.color + "33",
    borderWidth: 2,
    pointBackgroundColor: ai.color,
  }));

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: CRITERIA.map((c) => c.label),
      datasets,
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { stepSize: 2, color: "#9aa5bd", backdropColor: "transparent" },
          grid: { color: "#2a3552" },
          angleLines: { color: "#2a3552" },
          pointLabels: { color: "#e8ecf5", font: { size: 12 } },
        },
      },
      plugins: {
        legend: { labels: { color: "#e8ecf5" } },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderScenarioCards();
  renderOverallTable();
  renderRadarChart();
});
