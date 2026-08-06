/* =========================================================
   Shared helpers + Chart.js light theme (Cursor palette)
   ========================================================= */

const T = {
  fg: "#26251e",
  textSec: "rgba(38,37,30,0.6)",
  textTer: "rgba(38,37,30,0.4)",
  grid: "rgba(38,37,30,0.08)",
  gridStrong: "rgba(38,37,30,0.14)",
  accent: "#f54e00",
  sans:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
};

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** 求某个 AI 在某个场景下的总分 / 均分 */
function scenarioTotal(scenarioId, aiId) {
  const rec = SCORES[scenarioId] && SCORES[scenarioId][aiId];
  if (!rec) return 0;
  return CRITERIA.reduce((sum, c) => sum + (rec.criteria[c.key] || 0), 0);
}

/** 场景是否已有评测数据 */
function scenarioHasData(scenarioId) {
  return AIS.some((ai) => scenarioTotal(scenarioId, ai.id) > 0);
}

/** 已完成评测的场景列表 */
function ratedScenarios() {
  return SCENARIOS.filter((s) => scenarioHasData(s.id));
}

/** 跨场景综合分：只统计已有数据的场景，返回按总分降序的排名数组 */
function overallRanking() {
  const rated = ratedScenarios();
  return AIS.map((ai) => {
    const perScenario = rated.map((s) => scenarioTotal(s.id, ai.id));
    const total = perScenario.reduce((a, b) => a + b, 0);
    const max = rated.length * CRITERIA.length * 10;
    return {
      ai,
      perScenario,
      total,
      max,
      avg: rated.length ? total / rated.length : 0,
      pct: max ? (total / max) * 100 : 0,
    };
  }).sort((a, b) => b.total - a.total);
}

/** 单场景排名 */
function scenarioRanking(scenarioId) {
  return AIS.map((ai) => ({
    ai,
    rec: SCORES[scenarioId][ai.id],
    total: scenarioTotal(scenarioId, ai.id),
  })).sort((a, b) => b.total - a.total);
}

/* ---------- Chart.js ---------- */
function applyChartDefaults() {
  if (typeof Chart === "undefined") return;
  Chart.defaults.font.family = T.sans;
  Chart.defaults.font.size = 12;
  Chart.defaults.color = T.textSec;
}

function makeRadarDatasets(getScore) {
  return AIS.map((ai) => ({
    label: ai.name,
    data: CRITERIA.map((c) => getScore(ai.id, c.key)),
    borderColor: ai.color,
    backgroundColor: hexToRgba(ai.color, 0.07),
    pointBackgroundColor: ai.color,
    pointBorderColor: "#f7f7f4",
    pointBorderWidth: 1.5,
    pointRadius: 3,
    pointHoverRadius: 5,
    borderWidth: 1.8,
    tension: 0.02,
  }));
}

function buildRadarConfig(datasets) {
  return {
    type: "radar",
    data: { labels: CRITERIA.map((c) => c.label), datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 6 },
      interaction: { mode: "nearest", intersect: false },
      scales: {
        r: {
          min: 0,
          max: 10,
          angleLines: { color: T.grid },
          grid: { color: T.grid, circular: true },
          pointLabels: {
            color: T.textSec,
            font: { size: 12, family: T.sans },
            padding: 8,
          },
          ticks: {
            stepSize: 2,
            display: true,
            backdropColor: "transparent",
            color: T.textTer,
            font: { size: 10, family: T.mono },
            showLabelBackdrop: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 18,
            color: T.textSec,
            font: { size: 12.5, family: T.sans },
          },
        },
        tooltip: {
          backgroundColor: T.fg,
          titleColor: "#f7f7f4",
          bodyColor: "rgba(247,247,244,0.8)",
          borderWidth: 0,
          cornerRadius: 6,
          padding: 10,
          titleFont: { size: 12.5, family: T.sans, weight: "500" },
          bodyFont: { size: 12, family: T.sans },
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
        },
      },
    },
  };
}

/* ---------- Shared chrome ---------- */
function renderFooter() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
    <div class="wrap footer-inner">
      <span>AI Coding Arena · 内部选型评测 · ${year}</span>
      <span>评分为人工主观评估，仅代表本次测试样本</span>
      <a href="https://github.com/cf3901646/ai-coding-arena" target="_blank" rel="noopener">在 GitHub 上查看源码 ↗</a>
    </div>`;
}
