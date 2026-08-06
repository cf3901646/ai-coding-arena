/**
 * ============================================================
 *  评测数据配置文件 —— 唯一需要你手动维护的数据源
 *  改这里的内容，首页雷达图、场景页卡片、表格会自动同步更新
 * ============================================================
 */

// 1) 参评的 4 个 AI（两个场景阵容一致）
const AIS = [
  { id: "kiro", name: "Kiro", vendor: "AWS", color: "#f54e00" },
  { id: "copilot", name: "GitHub Copilot", vendor: "GitHub", color: "#0f7b5a" },
  { id: "antigravity", name: "Antigravity", vendor: "Google", color: "#1a6dd9" },
  { id: "codex", name: "Codex", vendor: "OpenAI", color: "#7c5cbf" },
];

// 2) 三个测试场景
const SCENARIOS = [
  {
    id: "racing-game",
    title: "简单赛车游戏",
    short: "赛车游戏",
    desc: "用 HTML5/Canvas 或类似技术实现一个可玩的简单赛车小游戏",
    prompt: "做一个简单的赛车游戏，单文件 HTML，打开就能玩。",
    page: "scenarios/racing-game.html",
    participants: ["kiro", "copilot", "antigravity", "codex"],
  },
  {
    id: "philips-chronicle",
    title: "飞利浦编年史 HTML 页面",
    short: "编年史页面",
    desc: "以时间轴形式展示飞利浦公司历史、当前转型、业务产品与未来愿景的静态网页",
    prompt:
      "给飞利浦这家公司设计一个简单的编年史 HTML 页面，简单诉说飞利浦公司的历史，重点且详细展示当前公司的转型和业务，以及公司产品、未来愿景等内容。具体怎么做你自己决定，但要高级流畅，展现大公司的历史和对人类的贡献。",
    page: "scenarios/philips-chronicle.html",
    participants: ["kiro", "copilot", "antigravity", "codex"],
  },
  {
    id: "dashboard",
    title: "数据可视化看板",
    short: "数据看板",
    desc: "基于示例数据构建的交互式数据可视化仪表盘",
    prompt: "基于示例数据做一个交互式数据可视化看板。",
    page: "scenarios/dashboard.html",
    participants: ["kiro", "copilot", "antigravity", "codex"],
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
      criteria: { functionality: 10, codeQuality: 9, visualDesign: 9, performance: 8, oneShot: 9, instructionFit: 9 },
      timeSpent: "33 分 30 秒",
      minutes: 33.5,
      files: "单文件 HTML（80KB）",
      notes:
        "叙事能力最强的一份：36 个年份节点、4709 字正文、8 个章节，并专门写了「人类贡献」一章。" +
        "文案有真正的作者感——「它发明过卡式录音带与 CD，点亮过整个欧洲的夜晚」这类句子四份里只有它写得出来，" +
        "而且是唯一把「历史→转型→业务→产品→愿景」串成一条连贯故事线而非罗列条目的。" +
        "财务与产品数据密度最高（95 处数值断言）且经核查基本准确：€17.8B、可比增长 2%、Q4 单季 +7% 与官方财报一致，" +
        "BlueSeal / Azurion / Zenition / Rembra / SmartIQ 均为真实在售产品，还附了数据来源清单。" +
        "唯一硬伤：超声平台「Alturion」查无此物（真实产品线为 EPIQ / Affiniti / Lumify），发布前必须改掉。" +
        "工程细节也最专业：滚动进度条、导航章节高亮、跳转主内容的无障碍链接，且是四份中唯一正确实现 prefers-reduced-motion 降级的。",
      pros: ["叙事最完整有作者感", "数据经核查最准", "唯一做了无障碍降级", "零渲染缺陷"],
      cons: ["虚构了 Alturion 产品名", "页面 17383px 偏长"],
      demoPath: "demos/kiro/philips-chronicle/index.html",
      screenshot: "assets/img/kiro-philips-chronicle.png",
    },
    "copilot": {
      criteria: { functionality: 8, codeQuality: 8, visualDesign: 7, performance: 9, oneShot: 9, instructionFit: 8 },
      timeSpent: "6 分钟",
      minutes: 6,
      files: "单文件 HTML（32KB）",
      notes:
        "结构最工整、交付最稳的一份：17 个年份节点、12 个左右交错的时间轴节点、6 张转型卡、三大业务支柱、12 张产品卡，四个要求章节全覆盖。" +
        "性能最好——32KB、1 个请求、163ms 加载、零外部依赖，实测 60fps，且无任何渲染缺陷。" +
        "扣分点在视觉：配色与版式偏「标准企业官网」，稳妥但缺少记忆点，是四份里最不容易被记住的。" +
        "另未处理 prefers-reduced-motion（47 个动画元素在减少动效模式下依旧靠滚动才显示），「约 7 万员工」与 2024 年报的 68,419 略有出入。",
      pros: ["加载最快 32KB 零依赖", "结构工整覆盖全", "零渲染缺陷"],
      cons: ["视觉缺少记忆点", "未做无障碍降级", "员工数略不准"],
      demoPath: "demos/copilot/philips-chronicle/index.html",
      screenshot: "assets/img/copilot-philips-chronicle.png",
    },
    "antigravity": {
      criteria: { functionality: 7, codeQuality: 8, visualDesign: 8, performance: 7, oneShot: 6, instructionFit: 6 },
      timeSpent: "1 分钟",
      minutes: 1,
      files: "拆分 3 文件（index.html + styles.css + script.js，共 53KB）",
      notes:
        "配色是四份里最舒服的：淡蓝到青绿的渐变底 + 飞利浦品牌蓝，首屏那组同心圆动效干净又克制，观感优于 Copilot 的标准企业风。" +
        "工程上也有真本事——唯一做了 HTML/CSS/JS 三文件分离，也是唯一提供可用交互的：暗色模式切换与产品分类筛选实测都能用。" +
        "但内容是四份里最薄的：编年史只有 5 个时间轴条目、全文仅 3 处数值断言（Kiro 有 95 处），" +
        "提示词明确要求的「重点且详细展示当前公司的转型和业务」基本没兑现，这是它指令还原度低的主因。" +
        "另有两处实测缺陷：390px 手机与 768px 平板下均横向溢出 26px；滚动动画可逆，往回翻时时间轴整片淡出只剩一条竖线。",
      pros: ["配色观感最舒服", "唯一做了文件分离", "唯一有可用交互（暗色模式/筛选）"],
      cons: ["内容最薄仅 5 个时间轴条目", "手机与平板均横向溢出", "回滚时内容整片消失"],
      demoPath: "demos/antigravity/philips-chronicle/index.html",
      screenshot: "assets/img/antigravity-philips-chronicle.png",
    },
    "codex": {
      criteria: { functionality: 6, codeQuality: 5, visualDesign: 10, performance: 8, oneShot: 4, instructionFit: 6 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（33KB）+ 6 张实拍配图，另附完整 Next.js 脚手架",
      notes:
        "视觉天花板最高：四份里唯一用了真实飞利浦实拍照片（6 张），深蓝叠加大字标题的首屏有杂志和品牌广告片的气质，" +
        "「把光，变成生命的可能」这种排版处理是其余三份都没做到的。值得注意的是——它这份评价是在配色变量已经失效的状态下拿到的，修好只会更好。" +
        "但交付质量最差，实测两处独立缺陷：①HTML 第 10–12 行混进了终端输出（Exit code: 0 / Wall time / Output:），" +
        "CSS 解析器把紧随其后的整个 :root 变量块吞掉，7 个颜色变量全部失效（A/B 实验证实：删掉这 46 个字符后全部复活）；" +
        "②两处大标题中文行高小于字号（0.90 / 0.95），汉字上下相撞——把拉丁字体的紧行距套到中文上的典型错误，另外三份均无此问题。" +
        "内容也最薄（1428 字、11 个年份节点），且为一个「简单 HTML 页面」附带了整套 Next.js 工程脚手架。",
      pros: ["画面最好看", "唯一使用真实实拍配图", "零外部依赖"],
      cons: ["混入终端输出致配色失效", "中文标题行高塌陷相撞", "正文内容最少"],
      demoPath: "demos/codex/philips-chronicle/index.html",
      screenshot: "assets/img/codex-philips-chronicle.png",
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
  },
};

// 5) 首页总体结论（给领导看的一句话总结）
const SUMMARY = {
  headline:
    "Kiro 两场都是完成度第一，但它也是最慢的；Antigravity 用 1/34 的时间拿到了 Kiro 六成五的分数。",
  body:
    "四个模型的差距不在「能不能跑」，而在「愿意花多少时间把事做完」。" +
    "Kiro 两场合计花了 68.5 分钟，换来 88% 的得分率——编年史那份叙事最完整、财务数据经核查最准（€17.8B、Q4 +7% 与官方财报一致），" +
    "也是唯一实现无障碍降级的。GitHub Copilot 用 21 分钟拿到 71%，全程零渲染缺陷、加载最快，是「不惊艳但不会出事」的那一类。" +
    "Antigravity 两场只用了 2 分钟就拿到 57%，配色观感甚至优于 Copilot，但内容最薄、且手机与平板均横向溢出。" +
    "Codex 反而最尴尬：花了 30 分钟却只有 48%，它交出了四份里画面最好看的编年史（唯一使用真实实拍照片），" +
    "却把终端输出混进了 HTML，导致整组 CSS 配色变量失效。",
  recommendation:
    "交付质量优先、能等的场景选 Kiro；日常迭代与稳定产出选 GitHub Copilot（21 分钟拿 71%，时间性价比最高）；" +
    "只需要快速起稿或视觉方案选 Antigravity；Codex 目前需要人工收尾，不建议直接交付。",
  caveat:
    "已完成 3 个场景中的 2 个，四个模型两场阵容一致，总分可直接比较。" +
    "评分含客观实测（渲染缺陷、响应式、无障碍、性能、内容量）与主观判断（视觉观感、叙事质量）两部分；耗时为实际生成时长，不计入总分。",
};
