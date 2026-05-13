/** 《设计学概论》第三版 — 章节骨架（可继续在本文档增补段落与条目） */
export const BOOK_ID = "design-introduction-3";

/** @param {typeof designIntroChapters[number]} c */
function ch(c) {
  return { ...c, bookId: BOOK_ID };
}

export const designIntroChapters = [
  ch({
    id: "ch1",
    chapterNo: 1,
    title: "导论：设计学的研究范围及现状",
    shortTitle: "导论",
    summary:
      "本章解决 **设计是什么**、**设计学研究什么**，以及 **设计史 / 设计理论 / 设计批评** 三者的分工与联系；并交代若干 **当代研究取向** 作为后文伏笔。",
    logicFramework: [
      "设计的概念：从造物到系统与策略",
      "设计学的定义：交叉学科与问题域",
      "设计学的三大分支：史、论、评",
      "设计史研究：人物、材料与范式",
      "设计理论研究：概念、模型与方法",
      "设计批评研究：标准、价值与公共性",
      "西方设计思潮线索（简述）",
      "中国古代设计思想线索（简述）"
    ],
    keywords: [
      "**设计**：有目的的创造性活动，连接 **功能、形式与意义**。",
      "**设计学**：以设计为对象，综合 **人文、艺术与工程技术** 的交叉学科。",
      "**研究对象**：从 **造物结果** 扩展到 **过程、系统与社会影响**。"
    ],
    hotspots: ["设计的广义与狭义", "设计学的学科性质", "设计史/理论/批评的关系", "当代理论关键词"],
    figures: [
      { name: "桑佩尔", note: "技术—材料视角的设计史研究代表线索之一" },
      { name: "李格尔", note: "艺术意志与风格史线索，可与桑佩尔对照记忆" },
      { name: "佩夫斯纳", note: "设计史学科化书写的重要推动者" },
      { name: "吉迪恩", note: "空间、技术与现代性叙事" }
    ],
    confusions: [
      { title: "设计史 vs 美术史", note: "问题域不同：更关注 **功能、生产、使用与社会条件**。" },
      { title: "设计理论 vs 设计批评", note: "理论偏 **概念与模型**；批评偏 **价值判断与阐释**。" }
    ],
    mnemonic: "导论先立 **概念轴**；**史论评** 三分法背熟；人物线索 **别背散**，各记 **一个关键词** 即可答题定位。",
    relatedTemplateIds: ["tpl-term", "tpl-essay", "tpl-relation", "tpl-timeline"],
    importance: 5,
    commonTypes: ["名词解释", "简答题", "论述题"],
    termIds: ["t-ch1-design", "t-ch1-design-studies", "t-ch1-design-history", "t-ch1-design-theory", "t-ch1-design-criticism"],
    linkedMindmapIds: ["di-mm-book", "di-mm-criticism"],
    essayIdeas: ["试论设计学作为交叉学科的意义", "如何理解设计史与设计理论的关系？"]
  }),
  ch({
    id: "ch2",
    chapterNo: 2,
    title: "设计的多重特征",
    shortTitle: "多重特征",
    summary:
      "从 **艺术、科技、经济** 等维度理解设计不是单一价值活动；本章为 **关系类论述题** 提供稳定论点与概念工具。",
    logicFramework: [
      "艺术特征：审美、形式、情感与文化象征",
      "科技特征：材料、工艺、工具与可实现性",
      "经济特征：成本、市场、产业链与价值实现",
      "多重特征的权重随历史条件变化",
      "综合运用于论述：相互塑造而非孤立"
    ],
    keywords: [
      "**艺术特征**：审美、形式、情感与文化象征。",
      "**科技特征**：材料、工艺、工具与 **可实现性**。",
      "**经济特征**：成本、市场、产业链与 **价值实现**。"
    ],
    hotspots: ["设计与艺术的关系", "设计与科学技术的关系", "设计与经济的关系"],
    figures: [],
    confusions: [
      { title: "“功能”是否只属于科技维度？", note: "功能也进入 **审美判断与价值选择**（如“好用也是美”）。" }
    ],
    mnemonic: "**艺科经** 三角背；关系题 **总—分—案例—意义** 一条龙。",
    relatedTemplateIds: ["tpl-relation", "tpl-short", "tpl-essay"],
    importance: 5,
    commonTypes: ["简答题", "论述题", "关系类"],
    termIds: ["t-ch2-functionality"],
    linkedMindmapIds: ["di-mm-relations"],
    essayIdeas: ["试论设计与科学技术的关系", "试论设计与经济的关系"]
  }),
  ch({
    id: "ch3",
    chapterNo: 3,
    title: "中国设计溯源",
    shortTitle: "中国溯源",
    summary:
      "以 **器物—工艺—礼制—生活方式** 为主线理解中国造物传统；为与西方设计史 **对比题** 准备语汇与框架。",
    logicFramework: ["器物门类线索", "纹样与象征", "结构与空间（木作、园林、家具）", "与西方对话的切入点"],
    keywords: [
      "**器物体系**：材料—工艺—礼制—生活方式。",
      "**纹样与象征**：从 **神权、礼制到文人审美**。",
      "**结构与空间**：木作榫卯、园林与家具协同。"
    ],
    hotspots: ["彩陶与青铜器意涵", "瓷器与外销", "明式家具结构美学"],
    figures: [{ name: "明式家具", note: "线条、比例、榫卯与文人审美" }],
    confusions: [{ title: "民间工艺 vs 宫廷工艺", note: "服务对象、材料工艺与审美标准差异。" }],
    mnemonic: "**陶铜瓷木** 记门类；对比西方先找 **问题域** 再写异同。",
    relatedTemplateIds: ["tpl-timeline", "tpl-compare", "tpl-term"],
    importance: 4,
    commonTypes: ["名词解释", "简答题", "时间线题"],
    termIds: ["t-ch3-ming-furniture"],
    linkedMindmapIds: ["di-mm-timeline"],
    essayIdeas: ["传统造物智慧对当代设计的启示"]
  }),
  ch({
    id: "ch4",
    chapterNo: 4,
    title: "西方设计概观",
    shortTitle: "西方概观",
    summary:
      "以 **工业化** 为主轴理解手工艺反思、现代主义、包豪斯与国际传播；把握 **主张—形式—制度** 三维记忆。",
    logicFramework: ["手工艺反思", "机器生产与现代性", "现代主义与国际主义", "后现代多元与反思"],
    keywords: [
      "**工业化** 是现代设计史叙事主轴之一。",
      "**现代主义**：功能、理性、标准化与国际传播。",
      "**后现代**：多元、戏仿、对单一理性的反思。"
    ],
    hotspots: ["包豪斯", "现代主义与国际主义", "工业革命对设计的影响"],
    figures: [
      { name: "莫里斯", note: "工艺美术运动：手工艺、哥特精神与社会关怀" },
      { name: "格罗皮乌斯", note: "包豪斯与现代设计教育" }
    ],
    confusions: [{ title: "现代主义 vs 国际主义", note: "传播与简化的过程常被并列讨论，可答 **语境差异**。" }],
    mnemonic: "**工现包国后**：按时间轴串人物与口号。",
    relatedTemplateIds: ["tpl-impact", "tpl-figure", "tpl-timeline", "tpl-compare"],
    importance: 5,
    commonTypes: ["论述题", "时间线题", "人物流派题"],
    termIds: ["t-ch4-bauhaus"],
    linkedMindmapIds: ["di-mm-timeline", "di-mm-modern"],
    essayIdeas: ["试论现代主义设计的影响", "试论工业革命对设计的影响"]
  }),
  ch({
    id: "ch5",
    chapterNo: 5,
    title: "设计的现代分类",
    shortTitle: "现代分类",
    summary:
      "理解 **视觉传达 / 产品 / 环境** 等分类是认知工具；关注每类的 **对象—手段—场景** 链条与交叉趋势。",
    logicFramework: ["分类的意义与局限", "视觉传达：信息层级与媒介", "产品：系统与生命周期", "环境：尺度与公共性", "数字与交互的叠加"],
    keywords: [
      "**视觉传达**：信息 **编码—传播—识别** 的系统。",
      "**产品设计**：围绕 **批量化产品系统** 的整体设计。",
      "**环境设计**：从室内到城市公共空间。"
    ],
    hotspots: ["人机工程学", "品牌与视觉体系", "服务与系统设计趋势"],
    figures: [],
    confusions: [{ title: "UI 是否等于视觉传达？", note: "UI更偏 **交互逻辑与可用性**，常与信息架构绑定。" }],
    mnemonic: "**视产环** 三件套；名解先写 **对象—手段—目标** 不易跑题。",
    relatedTemplateIds: ["tpl-term", "tpl-short"],
    importance: 4,
    commonTypes: ["名词解释", "简答题"],
    termIds: ["t-ch5-visual-communication", "t-ch5-ergonomics"],
    linkedMindmapIds: ["di-mm-book"],
    essayIdeas: ["数字时代设计分类的变化"]
  }),
  ch({
    id: "ch6",
    chapterNo: 6,
    title: "设计师",
    shortTitle: "设计师",
    summary:
      "从 **角色—能力—伦理** 理解设计师在产业链与文化生产中的位置；论述题常与 **社会责任、可持续** 结合。",
    logicFramework: ["角色演变", "能力结构（硬技能+软技能）", "协作与沟通", "设计伦理与社会责任"],
    keywords: [
      "**角色**：从 **形式创造者** 到 **问题定义者与协调者**。",
      "**能力**：审美、技术沟通、用户研究与 **项目管理**。",
      "**伦理**：诚实、包容、可持续与社会责任。"
    ],
    hotspots: ["设计师类型与工作环境", "设计伦理", "跨学科协作"],
    figures: [],
    confusions: [{ title: "设计师品牌 vs 企业设计", note: "权责、署名、知识产权与流程差异。" }],
    mnemonic: "能力 **分硬软**；伦理题 **案例一句 + 原则两句** 最稳。",
    relatedTemplateIds: ["tpl-essay", "tpl-short", "tpl-impact"],
    importance: 4,
    commonTypes: ["简答题", "论述题"],
    termIds: ["t-ch6-designer"],
    linkedMindmapIds: ["di-mm-book"],
    essayIdeas: ["论设计师的社会责任"]
  }),
  ch({
    id: "ch7",
    chapterNo: 7,
    title: "设计批评",
    shortTitle: "设计批评",
    summary:
      "掌握 **批评的类型、对象与方法**；能把批评与设计史、理论区分，并用于 **作品分析题** 的“评价段”。",
    logicFramework: ["批评的定义与功能", "形式主义/功能主义/历史主义/文化批评等路径", "批评与公共领域"],
    keywords: [
      "**批评**是价值判断，也是 **公共讨论** 的机制。",
      "**类型**：形式、功能、历史、文化社会学等路径。",
      "**作用**：引导实践、形成标准、推动 **学科自觉**。"
    ],
    hotspots: ["设计批评的对象与方法", "形式主义与功能主义批评"],
    figures: [],
    confusions: [{ title: "批评 vs 吐槽", note: "批评需要 **标准、论据与可讨论性**。" }],
    mnemonic: "批评 **类型背四类**；作用 **阐释—规范—讨论** 三连。",
    relatedTemplateIds: ["tpl-term", "tpl-short", "tpl-essay", "tpl-work-case"],
    importance: 4,
    commonTypes: ["名词解释", "简答题"],
    termIds: ["t-ch7-design-criticism"],
    linkedMindmapIds: ["di-mm-criticism"],
    essayIdeas: ["设计批评在数字平台时代的变化"]
  })
];

export function getDesignIntroChapter(id) {
  return designIntroChapters.find((c) => c.id === id);
}

export function getAdjacentDesignIntroChapter(id) {
  const idx = designIntroChapters.findIndex((c) => c.id === id);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? designIntroChapters[idx - 1] : null,
    next: idx < designIntroChapters.length - 1 ? designIntroChapters[idx + 1] : null
  };
}
