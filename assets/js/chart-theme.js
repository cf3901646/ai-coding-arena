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
  // Canvas 文字没有子像素抗锯齿，1x 屏上会比 DOM 文字明显发虚。
  // 强制以不低于 2x 的分辨率绘制再由浏览器缩放，可显著提升清晰度。
  Chart.defaults.devicePixelRatio = Math.max(2, window.devicePixelRatio || 1);
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
/* 导航是全站唯一定义。四个页面的 HTML 里各有一份静态副本作为
   无 JS 时的兜底，载入后一律由这里重建，避免多份副本随改动漂移，
   也能让浏览器缓存到的旧 HTML 自动纠正成当前导航。 */
const NAV_ITEMS = [
  { label: "总览", page: "home" },
  { label: "赛车游戏", page: "racing-game" },
  { label: "编年史页面", page: "philips-chronicle" },
  { label: "数据看板", page: "dashboard" },
  { label: "One more thing", page: "home", hash: "one-more-thing" },
];

function renderNav() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const current = document.body.dataset.scenario || "home";
  const up = current === "home" ? "" : "../";
  const pathOf = (page) =>
    page === "home" ? "index.html" : "scenarios/" + page + ".html";

  const brand = document.querySelector(".brand");
  if (brand) brand.setAttribute("href", up + "index.html");

  nav.innerHTML = NAV_ITEMS.map((item) => {
    const samePage = item.page === current;
    let href;
    if (item.hash) {
      href = samePage ? "#" + item.hash : up + pathOf(item.page) + "#" + item.hash;
    } else {
      href = up + pathOf(item.page);
    }
    const cls = samePage && !item.hash ? ' class="active"' : "";
    return `<a href="${href}"${cls}>${item.label}</a>`;
  }).join("");
}

function initNavSpy() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll("a"));
  const anchors = links
    .map((a) => {
      const href = a.getAttribute("href") || "";
      if (href.charAt(0) !== "#") return null;
      const el = document.getElementById(href.slice(1));
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);
  if (!anchors.length) return;

  const home = links.find((a) => a.classList.contains("active")) || links[0];
  const header = document.querySelector(".site-header");

  function update() {
    const probe = (header ? header.getBoundingClientRect().bottom : 0) + 24;
    let current = null;
    anchors.forEach((a) => {
      const r = a.el.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) current = a.link;
    });
    // 页面滚到底时最后一个锚点区块可能撑不满视口，仍视为当前位置
    if (!current) {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = anchors[anchors.length - 1].link;
    }
    const target = current || home;
    links.forEach((a) => a.classList.toggle("active", a === target));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

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
