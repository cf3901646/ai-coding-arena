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
    desc: "在浏览器里实现一个可自由驾驶的开放世界开车游戏，WASD 操控",
    prompt:
      "帮我做一个运行在 HTML 上的大世界开车游戏，你自己构想细节，要求是用 WASD 操作车辆，游戏要好玩。不要问我任何细节，所有的你自己想，自己验证，可行后交付给我。",
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
    desc: "读取 500 条飞利浦医疗设备销售与服务数据，做一个支持联动筛选的交互式看板",
    prompt:
      "你是一名资深前端数据可视化专家和飞利浦医疗业务分析师。请读取 philips_medical_devices_sales_and_service.csv 数据，制作一个支持交互的数据可视化面板（单文件 HTML）。核心需求：① 数据预处理：自动兼容不同格式的日期并处理缺失值；② 核心 KPI 卡片：展示总销售额、平均设备运行率（Uptime）、平均维修响应时间；③ 图表与交互：区域 & 设备类别联动筛选器（筛选后全面板图表同步更新）、销售趋势与 Top 客户医院榜单、设备运行率 vs 故障报修次数的关联图表（快速识别高风险设备）；④ 视觉 UI：使用飞利浦医疗蓝和浅色设计，布局合理，交互流畅。",
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
      notes:
        "对照真实提示词的三条硬要求：「大世界」达标（Three.js 3D 开放世界，worldSize=1800，带小地图）；「WASD」达标；「好玩」未达标——霓虹画面花哨，但缺乏具体玩法引导和目标指示。提示词明确要求「自己验证，可行后交付」，而实际操控存在 bug，说明交付前未做有效自测。1 分钟出图是四者最快。",
      pros: ["3D 开放世界，画面观感最强", "出图最快（1 分钟）"],
      cons: ["没有玩法目标引导", "操控有 bug，未做交付前自测", "依赖 CDN，断网即白屏"],
      demoPath: "demos/antigravity/racing-game/index.html",
      screenshot: "assets/img/antigravity-racing-game.png",
    },
    "codex": {
      criteria: { functionality: 2, codeQuality: 4, visualDesign: 3, performance: 4, oneShot: 3, instructionFit: 4 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（约 14KB，Nightshift Open City Driver）",
      notes:
        "三条硬要求形式上都碰到了：有开放城市与小地图、WASD 可操作、也确实写了「午夜环城赛」任务和屏幕操作说明。但执行质量最弱——画面是四者中最简陋的（14KB，纯 2D 色块），实测按住 W 两秒半后时速仅 14km/h，加速迟滞得几乎开不动，「好玩」完全没达成。同样违背了「自己验证，可行后交付」这一条。",
      pros: ["零外部依赖，断网可用", "写了任务系统和操作说明"],
      cons: ["画面四者中最简陋", "加速迟滞，实测 2.5 秒仅到 14km/h", "操控有 bug，未做交付前自测"],
      demoPath: "demos/codex/racing-game/index.html",
      screenshot: "assets/img/codex-racing-game.png",
    },
    "kiro": {
      criteria: { functionality: 9, codeQuality: 8, visualDesign: 8, performance: 9, oneShot: 8, instructionFit: 10 },
      timeSpent: "35 分钟",
      minutes: 35,
      files: "单文件 HTML（约 38KB）",
      notes:
        "唯一三条硬要求全部达标的产出：「大世界」做成城区—工业区—海岸—荒野高速的无缝大地图并带昼夜循环；「WASD」操控流畅，并对方向键、空格做了 preventDefault 避免页面滚动干扰；「好玩」有限时竞速、快递任务、能量芯片收集、巡逻车追逐等完整循环，屏幕上有明确操作指示。也是唯一满足「自己验证，可行后交付」的一家——操控流畅，未发现 bug。代价是耗时最长（35 分钟）。",
      pros: ["三条硬要求全达标", "任务循环完整，有明确操作指示", "操控流畅无 bug，交付前确实自测过", "无缝大地图 + 昼夜循环"],
      cons: ["耗时最长（35 分钟）"],
      demoPath: "demos/kiro/racing-game/index.html",
      screenshot: "assets/img/kiro-racing-game.png",
    },
    "copilot": {
      criteria: { functionality: 5, codeQuality: 7, visualDesign: 5, performance: 8, oneShot: 6, instructionFit: 5 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（约 32KB）",
      notes:
        "「大世界」这一条达标且规模是四者中最大的（WORLD_SIZE=7000，城市 / 乡村 / 沙漠 / 湖泊四类地貌，带小地图）；WASD 操控流畅、无明显 bug。扣分主要在「好玩」——虽然做了金币收集和圈数挑战，但缺乏引导和目标感，整体更像一个驾驶 demo 而非完整游戏。代码结构清晰，32KB 零外部依赖。",
      pros: ["世界规模最大（WORLD_SIZE=7000）", "操控流畅无 bug", "代码结构清晰，零依赖"],
      cons: ["玩法缺乏引导，更像驾驶 demo", "视觉表现一般"],
      demoPath: "demos/copilot/racing-game/index.html",
      screenshot: "assets/img/copilot-racing-game.png",
    },
  },
  "philips-chronicle": {
    "kiro": {
      criteria: { functionality: 10, codeQuality: 9, visualDesign: 7, performance: 8, oneShot: 10, instructionFit: 10 },
      timeSpent: "33 分 30 秒",
      minutes: 33.5,
      files: "单文件 HTML（80KB）",
      notes:
        "叙事能力最强的一份：36 个年份节点、4709 字正文、64 个标题、8 个章节，并专门写了「人类贡献」一章。" +
        "文案有真正的作者感——「它发明过卡式录音带与 CD，点亮过整个欧洲的夜晚」这类句子四份里只有它写得出来，" +
        "而且是唯一把「历史→转型→业务→产品→愿景」串成一条连贯故事线而非罗列条目的。" +
        "财务与产品数据密度最高（95 处数值断言）且经核查全部属实：€17.8B、可比增长 2%、Q4 单季 +7% 与官方财报一致，" +
        "BlueSeal / Azurion / Zenition / Rembra / SmartIQ 均为真实在售产品，还附了数据来源清单。" +
        "特别值得注意的是超声平台「Alturion」——初次核查时因公开报道稀少一度被误判为虚构，" +
        "后经 FDA 510(k) 数据库核实确认真实存在（受理号 K260667，申请人 Philips Ultrasound, LLC，2026 年 6 月 29 日获批），" +
        "距本次评测仅五周。四份里只有它引用到了这个级别的最新产品信息。" +
        "工程细节也最专业：滚动进度条、导航章节高亮、跳转主内容的无障碍链接，且是四份中唯一正确实现 prefers-reduced-motion 降级的。" +
        "视觉一项被明显扣分：实测页面底色为 rgb(5,7,13)（亮度 7，近纯黑），是四份中唯一的暗色主题——" +
        "Copilot 与 Antigravity 的亮度分别为 248 和 250。暗色科技风本身完成度不低，" +
        "但飞利浦对外品牌体系以白底 + 品牌蓝为主，企业官网、年报、产品页均为亮色调，" +
        "这份产出直接用于对外场景需要整体重做配色，属于实打实的返工成本，因此该项从 9 分下调至 7 分。",
      pros: ["叙事最完整有作者感", "数据经核查全部属实", "引用到五周前刚获批的新品", "唯一做了无障碍降级", "零渲染缺陷"],
      cons: ["暗色主题不符合企业品牌规范，对外使用需重做配色", "页面 17215px 偏长", "耗时最久"],
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
        "另未处理 prefers-reduced-motion（47 个动画元素在减少动效模式下依旧靠滚动才显示），「约 7 万员工」与 2024 年报的 68,419 略有出入。" +
        "但它的亮色调（实测底色亮度 248）与飞利浦对外品牌体系一致，拿来即用无需改色——" +
        "这一点与 Kiro 恰好互补：两者视觉同为 7 分，失分原因却相反，Copilot 是「对味但平庸」，Kiro 是「出彩但跑偏」。",
      pros: ["加载最快 32KB 零依赖", "结构工整覆盖全", "零渲染缺陷", "亮色调符合企业品牌规范"],
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
        "工程上也有真本事——唯一做了 HTML/CSS/JS 三文件分离，也是唯一提供可用交互的：暗色模式切换与产品分类筛选实测都能用。而且只花了 1 分钟。" +
        "但内容是四份里最薄的：编年史只有 5 个时间轴条目、7 个年份节点、全文仅 3 处数值断言（Kiro 有 95 处），" +
        "提示词明确要求的「重点且详细展示当前公司的转型和业务」基本没兑现，这是它指令还原度低的主因。" +
        "另有两处实测缺陷：390px 手机与 768px 平板下均横向溢出 26px；滚动动画可逆，往回翻时时间轴整片淡出只剩一条竖线。" +
        "与 Codex 同为 42 分并列：它赢在文字量（2266 vs 1428）、交互与零渲染缺陷，输在时间轴最短且是唯一有响应式 bug 的一份。",
      pros: ["配色观感最舒服", "唯一做了文件分离", "唯一有可用交互（暗色模式/筛选）"],
      cons: ["内容最薄仅 5 个时间轴条目", "手机与平板均横向溢出", "回滚时内容整片消失"],
      demoPath: "demos/antigravity/philips-chronicle/index.html",
      screenshot: "assets/img/antigravity-philips-chronicle.png",
    },
    "codex": {
      criteria: { functionality: 6, codeQuality: 6, visualDesign: 10, performance: 8, oneShot: 6, instructionFit: 6 },
      timeSpent: "15 分钟",
      minutes: 15,
      files: "单文件 HTML（33KB）+ 7 张实拍配图，另附完整 Next.js 脚手架",
      notes:
        "视觉天花板最高：四份里唯一用了真实飞利浦实拍照片（7 张），深蓝叠加大字标题的首屏有杂志和品牌广告片的气质，" +
        "「把光，变成生命的可能」这种排版处理是其余三份都没做到的。" +
        "缺陷有两处但都不致命：①HTML 第 10–12 行混进了终端输出（Exit code / Wall time / Output:），" +
        "CSS 解析器把紧随其后的 :root 变量块吞掉，7 个颜色变量失效——实测影响集中在正文区（米色底变纯白、品牌蓝数字变黑、12 处标签卡片失去底色与描边），" +
        "首屏几乎看不出差别，所以肉眼容易漏掉。可用上方开关切到修复版对照，两版只差 44 个字符。" +
        "②两处大标题中文行高小于字号（108px 字号配 97px 行高），汉字上下相撞——把拉丁字体的紧行距套到中文上的典型错误；" +
        "此缺陷在修复版里依然存在，与终端输出无关，是独立问题。" +
        "真正拉低总分的不是这两个 bug，而是内容深度：全文 1428 字、11 个年份节点、23 个标题，均为四份最少（Kiro 为 4709 字 / 36 节点 / 64 标题）。",
      pros: ["画面最好看", "唯一使用真实实拍配图", "零外部依赖", "首屏观感几乎无损"],
      cons: ["混入终端输出致正文配色失效", "中文标题行高塌陷相撞", "正文内容最少"],
      demoPath: "demos/codex/philips-chronicle/index.html",
      altDemo: {
        label: "修复版",
        path: "demos/codex/philips-chronicle/fixed.html",
        note: "仅删除第 10–12 行的 44 个字符终端输出，其余代码一字未改。切换观察正文区的米色底、品牌蓝数字与标签描边。",
      },
      screenshot: "assets/img/codex-philips-chronicle.png",
    },
  },
  "dashboard": {
    "kiro": {
      criteria: { functionality: 10, codeQuality: 8, visualDesign: 9, performance: 8, oneShot: 9, instructionFit: 10 },
      timeSpent: "57 分钟",
      minutes: 57,
      files: "单文件 HTML（1164KB，内联 ECharts）",
      notes:
        "六条硬要求全部达标且深度最大：12 张图表（另外三家为 5 / 4 / 3）、6 张 KPI 卡、4 个筛选维度加日期范围选择器，" +
        "还单独做了一个「数据预处理报告」区块，把日期归一化与缺失值处理过程摊开给业务方看——这是提示词第一条要求，四家里只有它做成了可查证的独立区块。" +
        "数据经原始 CSV 逐项核对全部正确：总销售额 $158,986,550、平均运行率 96.15%、平均响应 12.7 小时，" +
        "筛到 North China 后 93 条 / $31.07M / 96.14% 也与标准答案完全一致；" +
        "销售趋势 20 个月合计精确等于全量销售额，说明 CSV 里混入的 55 条 M/D/YYYY 异格式日期一条没丢。" +
        "视觉是浅色配飞利浦蓝，筛选器带每项计数（如 North China 93），选中状态清晰。" +
        "唯一实测缺陷：没有监听窗口 resize，把浏览器从 1440px 拖到 600px 会残留 333px 横向溢出（其余三家都会自适应）；" +
        "各档宽度下重新加载则完全正常。代价是耗时最久，57 分钟是 Antigravity 的 28 倍。",
      pros: ["图表最多（12 张）功能最深", "唯一做了独立的数据预处理报告区块", "数据经 CSV 核对全部准确", "筛选器带计数，交互信息量最大"],
      cons: ["未监听窗口 resize，拖拽缩放残留 333px 溢出", "耗时最久（57 分钟）", "体积 1164KB 四家最大"],
      demoPath: "demos/kiro/dashboard/index.html",
      screenshot: "assets/img/kiro-dashboard.png",
    },
    "copilot": {
      criteria: { functionality: 8, codeQuality: 9, visualDesign: 8, performance: 9, oneShot: 9, instructionFit: 9 },
      timeSpent: "10 分钟",
      minutes: 10,
      files: "单文件 HTML（1127KB，内联 ECharts，零外部依赖）",
      notes:
        "本场性价比最高的一份：10 分钟做到六条要求全覆盖，5 张图表、5 张 KPI 卡、区域与设备类别双筛选联动，零 JS 报错、零渲染缺陷。" +
        "最出彩的是它把数据预处理结果直接做成了顶部徽章——「日期格式归一化 55 条 / 日期无法解析 0 条 / 满意度缺失 13 条 / 关键指标缺失 0 条」，" +
        "我用原始 CSV 逐条验算，445 条 YYYY-MM-DD 加 55 条 M/D/YYYY、满意度恰好 13 个空值，四个数字分毫不差。" +
        "这种把「我处理了什么」明确告知业务方的做法，在给管理层看的报表里比多画两张图更有价值。" +
        "响应式是四家中最稳的：新加载与拖拽缩放在 1440 / 1024 / 768 / 390px 下全部零溢出，图表自适应正确。" +
        "缓存后加载 341ms、滚动 52fps。扣分在深度不及 Kiro——图表数与筛选维度都少一档，视觉沿用标准企业蓝，稳妥但不出彩。",
      pros: ["预处理徽章数字经 CSV 验证完全准确", "响应式四家最稳，含拖拽缩放", "10 分钟覆盖全部要求，性价比最高", "零依赖零报错"],
      cons: ["图表数与筛选维度不及 Kiro", "视觉偏标准企业风，缺少记忆点"],
      demoPath: "demos/copilot/dashboard/index.html",
      screenshot: "assets/img/copilot-dashboard.png",
    },
    "antigravity": {
      criteria: { functionality: 7, codeQuality: 6, visualDesign: 8, performance: 7, oneShot: 8, instructionFit: 8 },
      timeSpent: "2 分钟",
      minutes: 2,
      files: "单文件 HTML（278KB，Tailwind + ECharts 走 CDN）",
      notes:
        "2 分钟的产出里塞进了 5 个筛选器（比要求的两个多出医院等级、保修状态与关键词搜索）、四象限风险气泡图、明细分页表、" +
        "CSV 导出和一个「高风险预警模式」开关——功能想象力是四家里最活跃的。数据同样经核对无误：散点 500 个点、报修合计 1,243 与标准答案一致。" +
        "性能此前按冷启动 8.8 秒计分偏低，实为首次穿代理拉取 CDN 所致；按内网可正常访问 CDN 的前提复测，" +
        "缓存后加载 588–736ms，与 Kiro（401–474ms）、Copilot（341–431ms）属同一档，筛选响应 90ms 是四家第二快，据此性能分由 4 上调至 7。" +
        "扣分主要在代码层面：图表数值以字符串形式喂给 ECharts（如 \"5.10\"），依赖库隐式转换，" +
        "配色用的是 Tailwind 默认蓝（59,130,246）而非飞利浦品牌蓝，滚动 47fps 是四家最低。",
      pros: ["2 分钟出全功能，速度碾压", "筛选维度最多（5 个）并带 CSV 导出", "四象限风险气泡图设计到位", "数据经核对准确"],
      cons: ["图表数值传字符串，代码不够规范", "用 Tailwind 默认蓝而非飞利浦品牌蓝", "滚动 47fps 四家最低"],
      demoPath: "demos/antigravity/dashboard/index.html",
      screenshot: "assets/img/antigravity-dashboard.png",
    },
    "codex": {
      criteria: { functionality: 6, codeQuality: 8, visualDesign: 8, performance: 10, oneShot: 8, instructionFit: 7 },
      timeSpent: "5 分 30 秒",
      minutes: 5.5,
      files: "单文件 HTML（37KB，D3 手绘 SVG，零外部依赖）",
      notes:
        "打法是四家里最克制的「精准最小交付」：3 张 KPI 卡、3 张图表、2 个筛选器，恰好对应提示词点名的项目，一条不多一条不少。" +
        "没有引入任何图表库，用 D3 手绘 SVG，因此体积只有 37KB——是 Kiro 的三十一分之一，实测加载 64–74ms、筛选响应 16ms，两项都是四家最快，性能给满分。" +
        "排版也是四家里最干净的，留白舒服，浅色配 #0072CE 飞利浦蓝。数据经核对准确，总销售额与筛选后子集均与 CSV 标准答案一致。" +
        "扣分在覆盖深度：没有高风险设备明细清单，也没有把数据预处理过程呈现出来（虽然图表下方标了「自动兼容常见日期格式」，但没有像另两家那样给出可查证的处理条数），" +
        "对「快速识别高风险设备」这条要求的支撑弱于其他三家。",
      pros: ["37KB 零依赖，体积与加载速度碾压（64ms）", "筛选响应 16ms 四家最快", "排版最干净，配色正确", "要求项精准命中，没有堆砌"],
      cons: ["缺少高风险设备明细清单", "预处理过程未给出可查证结果", "整体深度最浅"],
      demoPath: "demos/codex/dashboard/index.html",
      screenshot: "assets/img/codex-dashboard.png",
    },
  },
};

// 5) 首页总体结论（给领导看的一句话总结）
const SUMMARY = {
  headline:
    "三场评测结束：Kiro 89% 三场全胜但也最慢，GitHub Copilot 用四分之一的时间拿到 76%，是综合性价比最高的一档。",
  body:
    "四个模型的差距不在「能不能跑」，而在「愿意花多少时间把事做完」。" +
    "Kiro 三场合计 125.5 分钟换来 89% 的得分率，是唯一三场都拿第一的：" +
    "赛车是唯一把「大世界 / WASD / 好玩」三条硬要求全做到且交付前真正自测过的；" +
    "编年史叙事最完整、数据经核查全部属实（甚至引用到五周前才通过 FDA 认证的 Alturion 超声平台）；" +
    "看板做了 12 张图表与独立的数据预处理报告区块，深度最大。" +
    "它的短板集中在细节把控：编年史用了近纯黑的暗色主题，与飞利浦白底加品牌蓝的对外体系不符；看板未监听窗口 resize。" +
    "GitHub Copilot 三场只用了 31 分钟就拿到 76%，且三场全部零渲染缺陷、零 JS 报错，是「不惊艳但不会出事」的那一类。" +
    "看板那场尤其亮眼——10 分钟覆盖全部要求，还把数据预处理结果做成了顶部徽章（日期归一化 55 条、满意度缺失 13 条），" +
    "经原始 CSV 逐条验算分毫不差，这种把「我处理了什么」明确告知业务方的做法，在给管理层看的报表里比多画两张图更有价值。" +
    "Antigravity 三场只花 4 分钟就拿到 63%，速度碾压：看板那场 2 分钟做出 5 个筛选器、四象限风险气泡图和 CSV 导出，功能想象力最活跃；" +
    "短板是代码规范与内容深度——编年史内容最薄且手机平板均横向溢出，看板把图表数值以字符串形式喂给图表库。" +
    "Codex 波动最大：编年史把终端输出混进了 HTML 导致正文配色变量失效（站内可切换修复版对照），赛车几乎开不动；" +
    "但看板那场打了个漂亮的翻身仗——37KB 零依赖、加载 64ms、筛选响应 16ms，三项都是四家最快，排版也最干净，拿到 47 分。",
  recommendation:
    "结论按用途分开给：需要一次做深、能等的重要交付选 Kiro（但对外材料要额外交代配色规范）；" +
    "日常迭代、报表与稳定产出选 GitHub Copilot——31 分钟拿 76%，三场零缺陷，是唯一每一场都在水准线以上的；" +
    "赶时间起草或要视觉方案选 Antigravity；Codex 适合做轻量单页与视觉稿，但需要人工检查收尾。" +
    "若只能选一个在全公司铺开，推荐 GitHub Copilot：它的时间成本是 Kiro 的四分之一，而得分率只差 13 个百分点，且从未交付过带缺陷的产物。",
  caveat:
    "3 个场景全部完成，四个模型三场阵容一致，总分可直接比较。" +
    "评分含客观实测（渲染缺陷、响应式、无障碍、性能、内容量、数据准确性）与主观判断（视觉观感、叙事质量、可玩性）两部分；耗时为实际生成时长，不计入总分。" +
    "三场均按提示词原文的硬要求逐条核对，指令还原度以此为准；看板场景的所有数值均与原始 CSV 计算的标准答案交叉验证过。",
};
