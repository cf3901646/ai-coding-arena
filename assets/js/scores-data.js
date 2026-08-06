/**
 * ============================================================
 *  评测数据配置文件 —— 唯一需要你手动维护的数据源
 *  改这里的内容，首页雷达图、场景页卡片、表格会自动同步更新
 * ============================================================
 */

// 1) 参与评测的 4 个 AI
const AIS = [
  { id: "antigravity", name: "Antigravity", vendor: "Google", color: "#1a6dd9" },
  { id: "codex", name: "Codex", vendor: "OpenAI", color: "#7c5cbf" },
  { id: "kiro", name: "Kiro", vendor: "AWS", color: "#f54e00" },
  { id: "copilot", name: "GitHub Copilot", vendor: "GitHub", color: "#0f7b5a" },
];

// 2) 三个测试场景
const SCENARIOS = [
  {
    id: "racing-game",
    title: "简单赛车游戏",
    desc: "用 HTML5/Canvas 或类似技术实现一个可玩的简单赛车小游戏",
    prompt: "做一个简单的赛车游戏，单文件 HTML，打开就能玩。",
    page: "scenarios/racing-game.html",
  },
  {
    id: "philips-chronicle",
    title: "飞利浦编年史 HTML 页面",
    desc: "以时间轴形式展示飞利浦公司发展历程的静态网页",
    prompt: "做一个展示飞利浦公司发展历程的时间轴网页。",
    page: "scenarios/philips-chronicle.html",
  },
  {
    id: "dashboard",
    title: "数据可视化看板",
    desc: "基于示例数据构建的交互式数据可视化仪表盘",
    prompt: "基于示例数据做一个交互式数据可视化看板。",
    page: "scenarios/dashboard.html",
  },
];

// 3) 评分维度（0~10 分，用于雷达图 & 表格）
const CRITERIA = [
  { key: "functionality", label: "功能完整度", desc: "是否真的做出了一个能玩／能用的完整产物" },
  { key: "codeQuality", label: "代码质量", desc: "结构、可读性、可维护性，是否便于二次开发" },
  { key: "visualDesign", label: "视觉/UI设计", desc: "画面表现力与界面细节打磨程度" },
  { key: "performance", label: "性能/流畅度", desc: "运行帧率、响应速度、有无卡顿与崩溃" },
  { key: "oneShot", label: "一次成型度", desc: "首次输出即可用的程度，需要多少次返工" },
  { key: "instructionFit", label: "指令还原度", desc: "是否准确理解并实现了需求本意" },
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
      minutes: 1,
      files: "单文件 HTML（约 70KB，Cyber Horizon 3D，基于 Three.js CDN 的开放世界 3D 驾驶）",
      notes: "画面效果花哨（3D 开放世界），但缺乏具体玩法和目标指示，车辆操控存在 bug，需联网加载 Three.js。生成速度极快（1 分钟）。",
      pros: ["3D 开放世界", "出图最快"],
      cons: ["没有玩法目标", "操控有 bug", "依赖 CDN"],
      demoPath: "demos/antigravity/racing-game/index.html",
      screenshot: "assets/img/antigravity-racing-game.png",
    },
    "codex": {
      criteria: { functionality: 2, codeQuality: 4, visualDesign: 3, performance: 4, oneShot: 3, instructionFit: 3 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（约 14KB，Nightshift Open City Driver）",
      notes: "画面简陋，没有具体玩法或操作指示，车辆操控也存在 bug。四者中效果最弱。",
      pros: ["零外部依赖"],
      cons: ["画面简陋", "无玩法无指示", "操控有 bug"],
      demoPath: "demos/codex/racing-game/index.html",
      screenshot: "assets/img/codex-racing-game.png",
    },
    "kiro": {
      criteria: { functionality: 9, codeQuality: 8, visualDesign: 8, performance: 9, oneShot: 8, instructionFit: 9 },
      timeSpent: "35 分钟",
      minutes: 35,
      files: "单文件 HTML（约 38KB）",
      notes: "综合效果最佳：有明确的玩法和操作指示，画面细节丰富，车辆操控流畅无明显 bug。耗时也最长（35 分钟）。",
      pros: ["玩法完整", "有操作指示", "操控流畅", "画面细节好"],
      cons: ["耗时最长"],
      demoPath: "demos/kiro/racing-game/index.html",
      screenshot: "assets/img/kiro-racing-game.png",
    },
    "copilot": {
      criteria: { functionality: 5, codeQuality: 7, visualDesign: 5, performance: 8, oneShot: 6, instructionFit: 5 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（约 32KB）",
      notes: "车辆操控流畅、无明显 bug，但缺乏具体的玩法设计或目标指示，更像一个驾驶 demo 而非完整游戏。",
      pros: ["操控流畅", "代码结构清晰"],
      cons: ["缺少玩法目标", "视觉一般"],
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

// 5) 首页总体结论（给领导看的一句话总结）
const SUMMARY = {
  headline: "在唯一完成评测的赛车游戏场景中，Kiro 是唯一交付了完整可玩产物的模型。",
  body:
    "四个模型都能在一次对话内产出可运行的单文件 HTML，差距不在「能不能跑」，而在「是不是一个成品」。" +
    "Kiro 用最长的耗时换来了明确的玩法、操作指示与流畅手感；GitHub Copilot 操控扎实但缺少玩法目标；" +
    "Antigravity 一分钟就给出 3D 开放世界的视觉冲击，却没有可玩性；Codex 在画面与玩法上都最弱。",
  recommendation: "对交付质量敏感的场景推荐 Kiro；对迭代速度敏感的日常编码推荐 GitHub Copilot。",
  caveat: "当前仅完成 3 个场景中的 1 个，编年史页面与数据看板场景的评测仍在进行中。",
};
