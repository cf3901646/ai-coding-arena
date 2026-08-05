/**
 * ============================================================
 *  评测数据配置文件 —— 唯一需要你手动维护的数据源
 *  改这里的内容，首页雷达图、场景页卡片、表格会自动同步更新
 * ============================================================
 */

// 1) 参与评测的 4 个 AI
const AIS = [
  { id: "antigravity", name: "Antigravity", color: "#4f8ef7" },
  { id: "codex", name: "Codex", color: "#f77f4f" },
  { id: "kiro", name: "Kiro", color: "#4fbf7a" },
  { id: "copilot", name: "GitHub Copilot", color: "#b04ff7" },
];

// 2) 三个测试场景
const SCENARIOS = [
  {
    id: "racing-game",
    title: "简单赛车游戏",
    desc: "用 HTML5/Canvas 或类似技术实现一个可玩的简单赛车小游戏",
    page: "scenarios/racing-game.html",
  },
  {
    id: "philips-chronicle",
    title: "飞利浦编年史 HTML 页面",
    desc: "以时间轴形式展示飞利浦公司发展历程的静态网页",
    page: "scenarios/philips-chronicle.html",
  },
  {
    id: "dashboard",
    title: "数据可视化看板",
    desc: "基于示例数据构建的交互式数据可视化仪表盘",
    page: "scenarios/dashboard.html",
  },
];

// 3) 评分维度（0~10 分，用于雷达图 & 表格）
const CRITERIA = [
  { key: "functionality", label: "功能完整度" },
  { key: "codeQuality", label: "代码质量" },
  { key: "visualDesign", label: "视觉/UI设计" },
  { key: "performance", label: "性能/流畅度" },
  { key: "oneShot", label: "一次成型度" },
  { key: "instructionFit", label: "指令还原度" },
];

/**
 * 4) 打分与元信息数据
 * 结构：SCORES[scenarioId][aiId] = { criteria: {...}, timeSpent, files, notes, demoPath, screenshot }
 * racing-game 已接入4个AI的真实产出文件，打分/耗时/点评仍为占位，请实际体验后填写
 */
const SCORES = {
  "racing-game": {
    "antigravity": {
      criteria: { functionality: 3, codeQuality: 5, visualDesign: 8, performance: 4, oneShot: 3, instructionFit: 4 },
      timeSpent: "1 分钟",
      files: "单文件 HTML（约70KB，Cyber Horizon 3D，基于 Three.js CDN 的开放世界3D驾驶）",
      notes: "画面效果花哨（3D开放世界），但缺乏具体玩法和目标指示，车辆操控存在bug，需联网加载Three.js。生成速度极快（1分钟）。",
      demoPath: "demos/antigravity/racing-game/index.html",
      screenshot: "assets/img/antigravity-racing-game.png",
    },
    "codex": {
      criteria: { functionality: 2, codeQuality: 4, visualDesign: 3, performance: 4, oneShot: 3, instructionFit: 3 },
      timeSpent: "15 分钟",
      files: "单文件 HTML（约14KB，Nightshift Open City Driver）",
      notes: "画面简陋，没有具体玩法或操作指示，车辆操控也存在bug。四者中效果最弱。",
      demoPath: "demos/codex/racing-game/index.html",
      screenshot: "assets/img/codex-racing-game.png",
    },
    "kiro": {
      criteria: { functionality: 9, codeQuality: 8, visualDesign: 8, performance: 9, oneShot: 8, instructionFit: 9 },
      timeSpent: "35 分钟",
      files: "单文件 HTML（约38KB）",
      notes: "综合效果最佳：有明确的玩法和操作指示，画面细节丰富，车辆操控流畅无明显bug。耗时也最长（35分钟）。",
      demoPath: "demos/kiro/racing-game/index.html",
      screenshot: "assets/img/kiro-racing-game.png",
    },
    "copilot": {
      criteria: { functionality: 5, codeQuality: 7, visualDesign: 5, performance: 8, oneShot: 6, instructionFit: 5 },
      timeSpent: "15 分钟",
      files: "单文件 HTML（约32KB）",
      notes: "车辆操控流畅、无明显bug，但缺乏具体的玩法设计或目标指示，更像一个驾驶demo而非完整游戏。",
      demoPath: "demos/copilot/racing-game/index.html",
      screenshot: "assets/img/copilot-racing-game.png",
    },
  },
  "philips-chronicle": {
    "antigravity": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/antigravity/philips-chronicle/index.html",
      screenshot: "assets/img/antigravity-philips-chronicle.png",
    },
    "codex": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/codex/philips-chronicle/index.html",
      screenshot: "assets/img/codex-philips-chronicle.png",
    },
    "kiro": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/kiro/philips-chronicle/index.html",
      screenshot: "assets/img/kiro-philips-chronicle.png",
    },
    "copilot": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/copilot/philips-chronicle/index.html",
      screenshot: "assets/img/copilot-philips-chronicle.png",
    },
  },
  "dashboard": {
    "antigravity": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/antigravity/dashboard/index.html",
      screenshot: "assets/img/antigravity-dashboard.png",
    },
    "codex": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/codex/dashboard/index.html",
      screenshot: "assets/img/codex-dashboard.png",
    },
    "kiro": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/kiro/dashboard/index.html",
      screenshot: "assets/img/kiro-dashboard.png",
    },
    "copilot": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/copilot/dashboard/index.html",
      screenshot: "assets/img/copilot-dashboard.png",
    },
  },
};

// 5) 首页总体结论（给领导看的一句话总结，填完分数后建议手动更新这里）
const SUMMARY = {
  headline: "评测结论待填写（例如：综合来看 XX 在代码质量与一次成型度上领先，YY 在视觉设计上更出色…）",
  recommendation: "推荐使用：待填写",
};
