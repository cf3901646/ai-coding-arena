/**
 * 场景详情页渲染逻辑：读取当前页面 data-scenario 属性，渲染4个AI的对比卡片
 */

function renderScenarioHeader() {
  const scenarioId = document.body.dataset.scenario;
  const sc = SCENARIOS.find((s) => s.id === scenarioId);
  if (!sc) return;
  document.getElementById("scenario-title").textContent = sc.title;
  document.getElementById("scenario-desc").textContent = sc.desc;
  document.title = sc.title + " · AI 能力对比展示";
}

function renderAiCards() {
  const scenarioId = document.body.dataset.scenario;
  const el = document.getElementById("ai-cards");
  if (!el) return;

  el.innerHTML = AIS.map((ai) => {
    const rec = SCORES[scenarioId][ai.id];
    const scorePills = CRITERIA.map((c) => `<span class="score-pill">${c.label}: ${rec.criteria[c.key]}</span>`).join("");
    return `
      <div class="ai-card">
        <div class="ai-card-header">
          <span class="dot" style="background:${ai.color}"></span> ${ai.name}
          <a class="open-new-tab" href="../${rec.demoPath}" target="_blank" rel="noopener">在新标签页全屏打开 ↗</a>
        </div>
        <div class="demo-frame-wrap">
          <iframe src="../${rec.demoPath}" loading="lazy" title="${ai.name} demo"
            allow="fullscreen; autoplay; pointer-lock" allowfullscreen></iframe>
        </div>
        <div class="ai-card-body">
          <div class="meta-row"><span>耗时</span><span>${rec.timeSpent}</span></div>
          <div class="meta-row"><span>文件/代码量</span><span>${rec.files}</span></div>
          <div class="score-mini">${scorePills}</div>
          <div class="notes">${rec.notes}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderScenarioChart() {
  const scenarioId = document.body.dataset.scenario;
  const canvas = document.getElementById("scenarioRadarChart");
  if (!canvas || typeof Chart === "undefined") return;

  const datasets = AIS.map((ai) => ({
    label: ai.name,
    data: CRITERIA.map((c) => SCORES[scenarioId][ai.id].criteria[c.key]),
    borderColor: ai.color,
    backgroundColor: ai.color + "33",
    borderWidth: 2,
    pointBackgroundColor: ai.color,
  }));

  new Chart(canvas, {
    type: "radar",
    data: { labels: CRITERIA.map((c) => c.label), datasets },
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
      plugins: { legend: { labels: { color: "#e8ecf5" } } },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderScenarioHeader();
  renderAiCards();
  renderScenarioChart();
});
