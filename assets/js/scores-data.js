/**
 * ============================================================
 *  评测数据配置文件 —— 唯一需要你手动维护的数据源
 *  改这里的内容，首页雷达图、场景页卡片、表格会自动同步更新
 * ============================================================
 */

// 1) 参评模型全集（每个场景的实际参赛阵容见 SCENARIOS[].participants）
const AIS = [
  { id: "antigravity", name: "Antigravity", vendor: "Google", color: "#1a6dd9" },
  { id: "codex", name: "Codex", vendor: "OpenAI", color: "#7c5cbf" },
  { id: "kiro", name: "Kiro", vendor: "AWS", color: "#f54e00" },
  { id: "copilot", name: "GitHub Copilot", vendor: "GitHub", color: "#0f7b5a" },
  { id: "chatgpt", name: "ChatGPT", vendor: "OpenAI", color: "#10a37f" },
  { id: "gemini", name: "Gemini", vendor: "Google", color: "#c2410c" },
];

// 2) 三个测试场景
const SCENARIOS = [
  {
    id: "racing-game",
    title: "简单赛车游戏",
    desc: "用 HTML5/Canvas 或类似技术实现一个可玩的简单赛车小游戏",
    prompt: "做一个简单的赛车游戏，单文件 HTML，打开就能玩。",
    page: "scenarios/racing-game.html",
    participants: ["kiro", "copilot", "antigravity", "codex"],
  },
  {
    id: "philips-chronicle",
    title: "飞利浦编年史 HTML 页面",
    desc: "以时间轴形式展示飞利浦公司历史、当前转型、业务产品与未来愿景的静态网页",
    prompt:
      "给飞利浦这家公司设计一个简单的编年史 HTML 页面，简单诉说飞利浦公司的历史，重点且详细展示当前公司的转型和业务，以及公司产品、未来愿景等内容。具体怎么做你自己决定，但要高级流畅，展现大公司的历史和对人类的贡献。",
    page: "scenarios/philips-chronicle.html",
    participants: ["kiro", "copilot", "chatgpt", "gemini"],
  },
  {
    id: "dashboard",
    title: "数据可视化看板",
    desc: "基于示例数据构建的交互式数据可视化仪表盘",
    prompt: "基于示例数据做一个交互式数据可视化看板。",
    page: "scenarios/dashboard.html",
    participants: ["kiro", "copilot", "chatgpt", "gemini"],
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
    "kiro": {
      criteria: { functionality: 10, codeQuality: 9, visualDesign: 9, performance: 8, oneShot: 10, instructionFit: 9 },
      timeSpent: "-",
      files: "单文件 HTML（80KB）",
      notes:
        "四份里唯一把提示词全部要点做完的：36 个年份节点、4709 字正文、8 个章节（含专门的「人类贡献」章）。" +
        "财务与产品数据密度最高（95 处数值断言）且经核查基本准确——2025 年 €17.8B、可比增长 2%、Q4 单季 +7% 与官方财报一致，" +
        "BlueSeal / Azurion / Zenition / Rembra / SmartIQ 均为真实在售产品，还附了数据来源清单。" +
        "唯一实测缺陷：超声平台「Alturion」查无此物（真实产品线为 EPIQ / Affiniti / Lumify），属虚构。" +
        "工程细节也最专业：滚动进度条、导航章节高亮、跳转到主内容的无障碍链接，且是四份中唯一正确实现 prefers-reduced-motion 降级的。",
      pros: ["内容量最大", "数据经核查最准", "唯一做了无障碍降级", "零渲染缺陷"],
      cons: ["虚构了 Alturion 产品名", "页面 17383px 偏长，不算「简单」"],
      demoPath: "demos/kiro/philips-chronicle/index.html",
      screenshot: "assets/img/kiro-philips-chronicle.png",
    },
    "copilot": {
      criteria: { functionality: 8, codeQuality: 8, visualDesign: 7, performance: 9, oneShot: 9, instructionFit: 8 },
      timeSpent: "-",
      files: "单文件 HTML（32KB）",
      notes:
        "结构最工整、交付最稳的一份：17 个年份节点、12 个左右交错的时间轴节点、6 张转型卡、三大业务支柱、12 张产品卡，四个要求章节全覆盖。" +
        "性能最好——32KB、1 个请求、163ms 加载、零外部依赖，实测 60fps 无卡顿，也无任何渲染缺陷。" +
        "扣分点在视觉偏「标准企业官网」缺少记忆点，且未处理 prefers-reduced-motion（47 个动画元素在减少动效模式下依旧靠滚动才显示）。" +
        "「约 7 万员工」与 2024 年报的 68,419 略有出入。",
      pros: ["加载最快 32KB 零依赖", "结构工整覆盖全", "无渲染缺陷"],
      cons: ["视觉缺少记忆点", "未做无障碍降级", "员工数略不准"],
      demoPath: "demos/copilot/philips-chronicle/index.html",
      screenshot: "assets/img/copilot-philips-chronicle.png",
    },
    "gemini": {
      criteria: { functionality: 6, codeQuality: 7, visualDesign: 6, performance: 7, oneShot: 6, instructionFit: 5 },
      timeSpent: "-",
      files: "拆分 3 文件（index.html + styles.css + script.js，共 53KB）",
      notes:
        "唯一做了工程化拆分（HTML/CSS/JS 三文件分离）也是唯一提供真交互的：暗色模式切换与产品分类筛选实测均可用。" +
        "但内容是四份里最薄的——编年史只有 5 个时间轴条目、全文仅 3 处数值断言，提示词要求的「重点且详细展示转型和业务」基本没做到。" +
        "实测两处硬伤：390px 手机与 768px 平板下均出现横向溢出（内容宽度超出视口 26px / 26px）；" +
        "滚动动画可逆，往回翻时时间轴整片淡出只剩一条竖线。另依赖 Google Fonts CDN（字体被墙时会回退，不影响可读）。",
      pros: ["唯一做了文件分离", "唯一有可用交互（暗色模式/筛选）", "首屏精致"],
      cons: ["内容最薄仅 5 个时间轴条目", "手机与平板均横向溢出", "回滚时内容整片消失"],
      demoPath: "demos/gemini/philips-chronicle/index.html",
      screenshot: "assets/img/gemini-philips-chronicle.png",
    },
    "chatgpt": {
      criteria: { functionality: 6, codeQuality: 5, visualDesign: 7, performance: 8, oneShot: 4, instructionFit: 6 },
      timeSpent: "-",
      files: "单文件 HTML（33KB）+ 6 张实拍配图，另附完整 Next.js 脚手架",
      notes:
        "视觉天花板最高：四份里唯一用了真实飞利浦实拍照片（6 张），首屏排版有杂志级的气质。" +
        "但交付质量最差，实测两处独立缺陷：①HTML 第 10–12 行混进了终端输出（Exit code: 0 / Wall time / Output:），" +
        "导致紧随其后的整个 :root 变量块被 CSS 解析器吞掉，7 个颜色变量全部失效（A/B 实验证实：删掉这 46 个字符后全部复活）；" +
        "②两处大标题中文行高小于字号（0.90 / 0.95），汉字上下相撞——这是把拉丁字体的紧行距套到中文上的典型错误，另外三份均无此问题。" +
        "内容也最薄（1428 字、11 个年份节点），且为一个「简单 HTML 页面」附带了整套 Next.js 工程脚手架。",
      pros: ["唯一使用真实实拍配图", "首屏视觉最高级", "零外部依赖"],
      cons: ["混入终端输出致配色失效", "中文标题行高塌陷相撞", "正文内容最少"],
      demoPath: "demos/chatgpt/philips-chronicle/index.html",
      screenshot: "assets/img/chatgpt-philips-chronicle.png",
    },
  },
  "dashboard": {
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
    "chatgpt": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/chatgpt/dashboard/index.html",
      screenshot: "assets/img/chatgpt-dashboard.png",
    },
    "gemini": {
      criteria: { functionality: 0, codeQuality: 0, visualDesign: 0, performance: 0, oneShot: 0, instructionFit: 0 },
      timeSpent: "-", files: "-", notes: "待填写",
      demoPath: "demos/gemini/dashboard/index.html",
      screenshot: "assets/img/gemini-dashboard.png",
    },
  },
};

// 5) 首页总体结论（给领导看的一句话总结）
const SUMMARY = {
  headline:
    "两个场景测下来，Kiro 都是交付完成度最高的模型；而「看起来最惊艳」和「实际最能用」并不是同一个。",
  body:
    "赛车游戏场景中，Kiro 是唯一交付了完整可玩产物的模型，GitHub Copilot 操控扎实但缺少玩法目标。" +
    "飞利浦编年史场景中，Kiro 依然领先：内容量最大、财务数据经核查最准（€17.8B、Q4 +7% 与官方财报一致）、" +
    "且是唯一实现无障碍降级的一份。ChatGPT 交出了视觉天花板最高的页面（唯一使用真实实拍照片），" +
    "却因为 HTML 里混进了终端输出、导致整组 CSS 配色变量失效，加上中文标题行高塌陷相撞，一次成型度反而最低。" +
    "GitHub Copilot 全程稳定、零缺陷、加载最快，是「不惊艳但不会出事」的那一类。",
  recommendation:
    "对交付质量与内容准确性敏感的场景推荐 Kiro；对速度、稳定性与日常迭代推荐 GitHub Copilot；" +
    "ChatGPT 适合先出视觉方案再由人工收尾；Gemini 目前更适合需要前端工程化拆分的小页面。",
  caveat:
    "已完成 3 个场景中的 2 个。两场参赛阵容不同（赛车场为 Kiro / Copilot / Antigravity / Codex，" +
    "编年史场为 Kiro / Copilot / ChatGPT / Gemini），因此综合排名按「参赛场次的平均得分率」计算，而非总分累加。",
};
