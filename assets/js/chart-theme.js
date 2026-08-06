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

/** 某场景的参赛阵容（未声明 participants 时回退为全体） */
function scenarioAIs(scenarioId) {
  const s = SCENARIOS.find((x) => x.id === scenarioId);
  if (!s || !Array.isArray(s.participants)) return AIS;
  return s.participants
    .map((id) => AIS.find((a) => a.id === id))
    .filter(Boolean);
}

/** 某 AI 是否参加了某场景 */
function isParticipant(scenarioId, aiId) {
  return scenarioAIs(scenarioId).some((a) => a.id === aiId);
}

/** 求某个 AI 在某个场景下的总分 / 均分 */
function scenarioTotal(scenarioId, aiId) {
  const rec = SCORES[scenarioId] && SCORES[scenarioId][aiId];
  if (!rec || !rec.criteria) return 0;
  return CRITERIA.reduce((sum, c) => sum + (rec.criteria[c.key] || 0), 0);
}

/** 场景是否已有评测数据 */
function scenarioHasData(scenarioId) {
  return scenarioAIs(scenarioId).some((ai) => scenarioTotal(scenarioId, ai.id) > 0);
}

/** 已完成评测的场景列表 */
function ratedScenarios() {
  return SCENARIOS.filter((s) => scenarioHasData(s.id));
}

/**
 * 跨场景综合排名。
 * 各场景阵容不同，直接比总分对参赛少的模型不公平，
 * 因此以「参赛场次的平均得分率」排序，并保留参赛场次数供 UI 标注。
 */
function overallRanking() {
  const rated = ratedScenarios();
  const perMax = CRITERIA.length * 10;

  return AIS.map((ai) => {
    const perScenario = rated.map((s) =>
      isParticipant(s.id, ai.id) ? scenarioTotal(s.id, ai.id) : null
    );
    const joined = perScenario.filter((v) => v !== null);
    const total = joined.reduce((a, b) => a + b, 0);
    const max = joined.length * perMax;
    return {
      ai,
      perScenario,
      joined: joined.length,
      total,
      max,
      avg: joined.length ? total / joined.length : 0,
      pct: max ? (total / max) * 100 : 0,
    };
  })
    .filter((r) => r.joined > 0)
    .sort((a, b) => b.pct - a.pct || b.joined - a.joined);
}

/** 单场景排名（只含该场景参赛模型） */
function scenarioRanking(scenarioId) {
  const rows = scenarioAIs(scenarioId)
    .map((ai) => ({
      ai,
      rec: (SCORES[scenarioId] || {})[ai.id],
      total: scenarioTotal(scenarioId, ai.id),
    }))
    .sort((a, b) => b.total - a.total);

  // 标准竞赛名次：同分并列，后续名次跳号（1,2,3,3,5）
  rows.forEach((r, i) => {
    r.rank = i > 0 && r.total === rows[i - 1].total ? rows[i - 1].rank : i + 1;
    r.tied = false;
  });
  rows.forEach((r) => {
    r.tied = rows.filter((x) => x.rank === r.rank).length > 1;
  });
  return rows;
}

/* ---------- Chart.js ---------- */
function applyChartDefaults() {
  if (typeof Chart === "undefined") return;
  Chart.defaults.font.family = T.sans;
  Chart.defaults.font.size = 12;
  Chart.defaults.color = T.textSec;
}

function makeRadarDatasets(getScore, ais) {
  return (ais || AIS).map((ai) => ({
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
