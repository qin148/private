import { BOOK_ID } from "./chapters.js";

export const bankQuestionTypes = [
  { key: "noun", label: "名词解释", tag: "term" },
  { key: "short", label: "简答题", tag: "short" },
  { key: "essay", label: "论述题", tag: "essay" },
  { key: "compare", label: "对比分析题", tag: "compare" },
  { key: "timeline", label: "时间线题", tag: "timeline" },
  { key: "figure", label: "人物流派题", tag: "figure" },
  { key: "work", label: "作品分析题", tag: "work" }
];

export const designIntroQuestions = [
  {
    id: "q-n1",
    bookId: BOOK_ID,
    chapterId: "ch1",
    typeKey: "noun",
    title: "名词解释：设计",
    importance: 5,
    isHighFrequency: true,
    keywords: ["有目的的造物", "功能与形式", "计划与策略"],
    answerIdea: "先界定 **广义/狭义**，再落到 **目的性、系统性、创造性**，最后点出与 **艺术/科技/经济** 的关系。",
    structure: "①属概念 **造物活动** →②核心 **目的性+计划性** →③补充 **交叉价值**",
    compact:
      "**设计**是在一定 **情境与约束条件** 下，为实现特定目标而进行的 **创造性规划与物化活动**，强调 **功能、形式与意义** 的统一。",
    expanded:
      "可从 **广义/狭义** 展开：广义接近 **一切人为干预与筹划**；狭义聚焦 **专业设计实践**（产品、视觉、环境等）。可补一句 **设计学作为交叉学科** 的方法论意义。",
    migratablePhrases: [
      "从设计实践看，……强调在约束条件下进行创造性整合。",
      "因此，理解设计概念是理解后续设计史与设计理论的前提。"
    ],
    relatedTermIds: ["t-ch1-design"],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "q-n2",
    bookId: BOOK_ID,
    chapterId: "ch5",
    typeKey: "noun",
    title: "名词解释：人机工程学",
    importance: 4,
    isHighFrequency: true,
    keywords: ["人的尺度", "可用性", "安全舒适"],
    answerIdea: "定义 **人—机—环境**，再写 **目标（可用/安全/效率）**，最后落到 **产品设计/环境设计** 应用。",
    structure: "定义→研究对象→设计应用",
    compact:
      "**人机工程学**研究人在使用产品与环境中的 **生理与心理特征**，以优化 **可用性、安全与效率**。",
    expanded:
      "可联系 **产品设计、环境设计** 中的 **尺度、界面、信息层级**；点到 **“以用户为中心”** 与 **伦理责任** 即可收束。",
    migratablePhrases: ["从用户路径出发，……关注关键触点上的尺度与反馈。"],
    relatedTermIds: ["t-ch5-ergonomics"],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "q-s1",
    bookId: BOOK_ID,
    chapterId: "ch2",
    typeKey: "short",
    title: "简述设计的艺术特征",
    importance: 5,
    isHighFrequency: true,
    keywords: ["审美价值", "形式语言", "情感表达"],
    answerIdea: "分点写 **形式/情感/文化象征**，用一句对比 **纯艺术的他律 vs 设计的约束**。",
    structure: "点题→分点（形式/情感/文化象征）→短例→收束",
    compact:
      "①设计具有 **审美与形式创造**；②承担 **情感与文化象征**；③与纯艺术不同，设计 **受功能与批量化约束**。",
    expanded:
      "可举 **海报/包装/空间氛围** 任一短例；对比 **“艺术自律”与“设计他律”** 一句即可增分。",
    migratablePhrases: ["由此可见，艺术特征在设计中并非附属，而是与用户感知强相关。"],
    relatedTermIds: [],
    relatedTemplateIds: ["tpl-short", "tpl-relation"]
  },
  {
    id: "q-s2",
    bookId: BOOK_ID,
    chapterId: "ch7",
    typeKey: "short",
    title: "简述设计批评的主要类型（要点）",
    importance: 4,
    isHighFrequency: true,
    keywords: ["形式主义", "功能主义", "历史主义", "文化学"],
    answerIdea: "先一句定义批评，再 **四分法** 各用一句话解释关注点。",
    structure: "界定设计批评→列举类型→各用一句话解释",
    compact:
      "设计批评是对设计现象的价值判断与阐释，常见类型包括 **形式主义、功能主义、历史主义、文化学批评** 等。",
    expanded:
      "每种批评关注 **评价焦点** 不同：形式/功能/语境/权力与文化意义；可点到 **批评与设计的互动关系**。",
    migratablePhrases: ["从方法上看，不同类型批评对应不同的证据来源与评价标准。"],
    relatedTermIds: ["t-ch7-design-criticism"],
    relatedTemplateIds: ["tpl-short"]
  },
  {
    id: "q-e1",
    bookId: BOOK_ID,
    chapterId: "ch2",
    typeKey: "essay",
    title: "试论设计与科学技术的关系",
    importance: 5,
    isHighFrequency: true,
    keywords: ["相互促进", "材料与工艺", "数字化"],
    answerIdea: "总述 **相互塑造** →分论点（推动/约束/方法论）→史例+当代例→意义收束。",
    structure: "总述关系→分论点（推动/约束/方法论）→史例+当代例→意义收束",
    compact:
      "科技为设计提供 **材料、工具与可能性**；设计将科技 **转译为可用、可感的产品与系统**；二者在历史中 **螺旋上升**。",
    expanded:
      "史例：**工业革命—批量化**、**数字技术—交互与生成**；辩证：**技术决定论 vs 社会建构** 一句；收束 **可持续与伦理**。",
    migratablePhrases: ["因此，理解技术与设计的关系，是理解现代设计生产机制的关键。"],
    relatedTermIds: [],
    relatedTemplateIds: ["tpl-relation", "tpl-essay"]
  },
  {
    id: "q-e2",
    bookId: BOOK_ID,
    chapterId: "ch4",
    typeKey: "essay",
    title: "试论现代主义设计的影响",
    importance: 5,
    isHighFrequency: true,
    keywords: ["功能理性", "标准化", "国际主义"],
    answerIdea: "按 **影响意义类模板** 展开：背景—特征—影响—局限—史观。",
    structure: "概念界定→原因→特征→积极影响→局限→史观总结",
    compact:
      "现代主义以 **功能、理性、简化** 回应工业化生产；推动 **设计教育与职业体系**；也带来 **同质化与文化削平** 的反思。",
    expanded:
      "案例：**包豪斯**、**密斯少即是多**；影响维度：**教育/城市/产品**；局限：**忽视地域与多元**；后现代作为 **部分回应** 可一笔带过。",
    migratablePhrases: ["从设计史角度看，现代主义既是解决方案，也制造了新的问题域。"],
    relatedTermIds: ["t-ch4-bauhaus"],
    relatedTemplateIds: ["tpl-impact", "tpl-essay"]
  },
  {
    id: "q-c1",
    bookId: BOOK_ID,
    chapterId: "ch4",
    typeKey: "compare",
    title: "比较工艺美术运动与新艺术运动的异同",
    importance: 4,
    isHighFrequency: false,
    keywords: ["手工艺", "自然曲线", "工业化态度"],
    answerIdea: "同：反工业化粗糙；异：社会改革 vs 形式语言；关系：问题意识相近。",
    structure: "背景界定→同→异→关系→启示",
    compact:
      "同：对 **工业化粗糙** 的反思，重视 **工艺与装饰**；异：莫里斯更重 **社会改革与哥特精神**；新艺术更重 **自然形态与曲线语言**。",
    expanded:
      "关系：**问题意识相近、形式路径不同**；启示：**装饰与功能、精英与大众** 的张力仍影响当代。",
    migratablePhrases: ["比较的意义在于澄清概念边界，而非简单褒贬。"],
    relatedTermIds: [],
    relatedTemplateIds: ["tpl-compare", "tpl-figure"]
  },
  {
    id: "q-t1",
    bookId: BOOK_ID,
    chapterId: "ch4",
    typeKey: "timeline",
    title: "简述西方现代设计发展脉络（纲要）",
    importance: 4,
    isHighFrequency: true,
    keywords: ["工艺美术", "现代主义", "后现代"],
    answerIdea: "分期命名 + 每阶段 **技术条件+形式特征** + 转折动因。",
    structure: "分期+每阶段关键词+转折事件",
    compact:
      "手工艺反思（工艺美术）→工业化与现代主义（功能理性）→战后消费与国际主义→后现代多元与数字时代。",
    expanded:
      "每段一句 **技术条件** +一句 **形式特征**；转折写 **战争、消费社会、信息技术** 之一即可。",
    migratablePhrases: ["整体呈现由手工艺伦理向机器美学再向多元文化演进。"],
    relatedTermIds: [],
    relatedTemplateIds: ["tpl-timeline", "tpl-impact"]
  },
  {
    id: "q-n3",
    bookId: BOOK_ID,
    chapterId: "ch7",
    typeKey: "noun",
    title: "名词解释：设计批评",
    importance: 4,
    isHighFrequency: true,
    keywords: ["价值判断", "标准", "阐释"],
    answerIdea: "定义→对象与方法→意义；与 **设计史** 区分一句。",
    structure: "定义→对象与方法→意义",
    compact:
      "**设计批评**是以 **价值标准** 对设计现象进行分析、阐释与判断的活动，连接 **理论、实践与公众接受**。",
    expanded:
      "可补 **批评的类型** 或 **批评对设计改良的作用** 一句，避免与 **设计史** 混写。",
    migratablePhrases: ["在设计公共领域中，批评促成标准形成与价值协商。"],
    relatedTermIds: ["t-ch1-design-criticism"],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "q-s3",
    bookId: BOOK_ID,
    chapterId: "ch3",
    typeKey: "short",
    title: "简述中国明清时期家具设计特点（要点）",
    importance: 4,
    isHighFrequency: false,
    keywords: ["明式", "结构美", "文人审美"],
    answerIdea: "时代定位→结构与材料→审美与文化→影响。",
    structure: "时代定位→结构与材料→审美与文化→影响",
    compact:
      "明式家具强调 **结构与线条** 的 **简洁含蓄**；重视 **木材与榫卯**；体现 **文人审美与生活方式**。",
    expanded:
      "可点到 **“材美工巧”** 与 **与建筑、园林的空间关系**；避免空泛形容词。",
    migratablePhrases: ["从生活方式角度看，家具是文化价值进入日常空间的载体。"],
    relatedTermIds: ["t-ch3-ming-furniture"],
    relatedTemplateIds: ["tpl-short", "tpl-figure"]
  },
  {
    id: "q-fig1",
    bookId: BOOK_ID,
    chapterId: "ch4",
    typeKey: "figure",
    title: "简述包豪斯的设计教育主张（人物/机构类）",
    importance: 5,
    isHighFrequency: true,
    keywords: ["艺术与技术统一", "工作坊", "课程体系"],
    answerIdea: "背景一句→核心主张→教学组织→影响与局限。",
    structure: "背景→主张→方法→影响",
    compact:
      "包豪斯强调 **艺术与技术的新统一**，以 **工作坊制** 训练综合能力，并形成基础课程与专业方向结合的教学框架。",
    expanded:
      "可联系 **现代设计职业化** 与 **国际传播**；局限可点到 **文化语境迁移中的简化风险**。",
    migratablePhrases: ["作为现代设计教育的原型，其意义在于把设计从经验技艺推向系统方法。"],
    relatedTermIds: ["t-ch4-bauhaus"],
    relatedTemplateIds: ["tpl-figure", "tpl-short"]
  },
  {
    id: "q-w1",
    bookId: BOOK_ID,
    chapterId: "ch4",
    typeKey: "work",
    title: "作品分析：巴塞罗那椅（示例）",
    importance: 3,
    isHighFrequency: false,
    keywords: ["现代主义", "钢结构", "符号性", "空间关系"],
    answerIdea: "作者与语境→形式与材料→功能与体验→象征与影响。",
    structure: "基本信息→形式语言→技术与人体→文化意义→评价",
    compact:
      "可作为 **现代主义家具** 的代表案例：强调 **结构表现与材料诚实**，同时在展示空间中承担 **形象与品牌** 的象征功能。",
    expanded:
      "分析时避免流水账：抓住 **结构节点、坐面尺度、与建筑空间关系** 三个观察点，再上升到 **现代主义美学范式** 即可。",
    migratablePhrases: ["从作品回到运动：它的形式选择回应了现代城市生活的何种经验？"],
    relatedTermIds: [],
    relatedTemplateIds: ["tpl-work-case", "tpl-figure"]
  }
];

export function getDesignIntroQuestion(id) {
  return designIntroQuestions.find((q) => q.id === id);
}

export function getBankTypeLabel(key) {
  return bankQuestionTypes.find((t) => t.key === key)?.label || key;
}

export function tagForBankType(key) {
  const t = bankQuestionTypes.find((x) => x.key === key);
  return t?.tag || "neutral";
}
