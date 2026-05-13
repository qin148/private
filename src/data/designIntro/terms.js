import { BOOK_ID } from "./chapters.js";
import { getDesignIntroQuestion } from "./questions.js";
import { termsChapter1 } from "./termsCh1.js";

/** 名词解释条目 — 后续可把 Markdown 批量转为本结构 */
const designIntroTermsRest = [
  {
    id: "t-ch2-functionality",
    bookId: BOOK_ID,
    chapterId: "ch2",
    title: "设计的功能性",
    type: "名词解释",
    importance: 4,
    isHighFrequency: false,
    keywords: ["使用目的", "可用性", "安全", "效率"],
    shortAnswer:
      "**功能性**指设计对 **使用目的与约束条件** 的回应，是价值实现的基础层面，与 **可用性、安全与效率** 密切相关。",
    expandedAnswer:
      "可与 **审美性、象征性** 对照：功能并非“冰冷”，而是设计中 **伦理与责任** 的落脚点之一。",
    answerStructure: ["定义", "主要维度", "与其他价值关系一句"],
    memoryTip: "功能题别只写“好用”，补 **约束条件**。",
    relatedQuestionIds: ["q-s1"],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "t-ch3-ming-furniture",
    bookId: BOOK_ID,
    chapterId: "ch3",
    title: "明式家具",
    type: "名词解释",
    importance: 4,
    isHighFrequency: true,
    keywords: ["榫卯", "线条", "文人审美", "结构美"],
    shortAnswer:
      "**明式家具**以 **硬木榫卯结构** 为核心，追求 **线条简练、比例含蓄与功能纯粹**，体现 **文人审美与工艺** 的统一。",
    expandedAnswer:
      "可补充与 **园林、空间尺度** 的关系，以及在 **造物伦理**（材美工巧）层面的意义。",
    answerStructure: ["材料结构", "形式特征", "文化意义"],
    memoryTip: "**结构—线条—文人** 三角。",
    relatedQuestionIds: ["q-s3"],
    relatedTemplateIds: ["tpl-term", "tpl-figure"]
  },
  {
    id: "t-ch4-bauhaus",
    bookId: BOOK_ID,
    chapterId: "ch4",
    title: "包豪斯",
    type: "名词解释",
    importance: 5,
    isHighFrequency: true,
    keywords: ["现代设计教育", "艺术与技术统一", "课程体系"],
    shortAnswer:
      "**包豪斯**是20世纪初德国的设计教育机构，强调 **艺术与技术统一**，建立了影响深远的 **现代设计教育课程体系**。",
    expandedAnswer:
      "可简述其对 **国际主义、功能理性与标准化生产** 的推动，同时点到 **文化单一性** 的反思作为辩证收束。",
    answerStructure: ["时间地点性质", "核心主张", "影响与评价"],
    memoryTip: "**教育+主张+影响** 一条链。",
    relatedQuestionIds: [],
    relatedTemplateIds: ["tpl-term", "tpl-figure"]
  },
  {
    id: "t-ch5-visual-communication",
    bookId: BOOK_ID,
    chapterId: "ch5",
    title: "视觉传达设计",
    type: "名词解释",
    importance: 4,
    isHighFrequency: true,
    keywords: ["信息层级", "识别", "媒介", "语境"],
    shortAnswer:
      "**视觉传达设计**以图形、文字与版式为手段，在特定媒介中完成 **信息识别与意义传达**，强调 **层级、可读性与文化语境**。",
    expandedAnswer:
      "可联系 **品牌系统、导视、数字界面** 等应用场景，点到 **受众与传播渠道** 对形式语言的影响。",
    answerStructure: ["定义手段", "目标（识别/传达）", "关键原则"],
    memoryTip: "**编码—传播—解码** 信息链。",
    relatedQuestionIds: [],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "t-ch5-ergonomics",
    bookId: BOOK_ID,
    chapterId: "ch5",
    title: "人机工程学",
    type: "名词解释",
    importance: 4,
    isHighFrequency: true,
    keywords: ["人的尺度", "可用性", "安全舒适", "人—机—环境"],
    shortAnswer:
      "**人机工程学**研究人在使用产品与环境中的 **生理与心理特征**，以优化 **可用性、安全与效率**。",
    expandedAnswer:
      "可联系 **产品设计、环境设计** 中的尺度与界面组织，并点到 **以用户为中心** 的方法论意义。",
    answerStructure: ["研究对象", "目标", "设计应用"],
    memoryTip: "**人—机—环境** 三连。",
    relatedQuestionIds: ["q-n2"],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "t-ch6-designer",
    bookId: BOOK_ID,
    chapterId: "ch6",
    title: "设计师（广义）",
    type: "名词解释",
    importance: 3,
    isHighFrequency: false,
    keywords: ["方案转化", "跨学科", "协调者"],
    shortAnswer:
      "**设计师**是以专业知识与创造性方法，将 **需求转化为可实施方案** 的主体，常在跨学科团队中承担 **整合与沟通** 角色。",
    expandedAnswer:
      "可补充 **职业伦理** 与 **社会责任**（如可持续、包容性设计）作为提升段。",
    answerStructure: ["定义", "能力关键词", "角色位置"],
    memoryTip: "从 **解决问题** 定义，不从“会画画”定义。",
    relatedQuestionIds: [],
    relatedTemplateIds: ["tpl-term"]
  },
  {
    id: "t-ch7-design-criticism",
    bookId: BOOK_ID,
    chapterId: "ch7",
    title: "设计批评（章节版要点）",
    type: "名词解释",
    importance: 4,
    isHighFrequency: true,
    keywords: ["价值标准", "类型", "公共讨论"],
    shortAnswer:
      "**设计批评**对设计现象进行 **阐释、分析与价值判断**，具有引导实践与公共讨论的功能。",
    expandedAnswer:
      "可与 **设计史** 区分：史偏 **脉络与事实组织**；批评更强调 **规范性与当代性**。",
    answerStructure: ["定义", "主要类型", "功能"],
    memoryTip: "**阐释—判断—讨论** 三步。",
    relatedQuestionIds: ["q-s2"],
    relatedTemplateIds: ["tpl-term", "tpl-short"]
  }
];

export const designIntroTerms = [...termsChapter1, ...designIntroTermsRest];

function normalizeRawTerm(t) {
  if (!t) return null;
  const relatedTemplateIds = t.relatedTemplateIds || t.relatedTemplates || [];
  const relatedTemplates = Array.isArray(t.relatedTemplates) ? t.relatedTemplates : relatedTemplateIds;
  let relatedQuestions = Array.isArray(t.relatedQuestions) ? [...t.relatedQuestions] : [];
  const rqIds = t.relatedQuestionIds || [];
  if (!relatedQuestions.length && rqIds.length) {
    relatedQuestions = rqIds.map((qid) => {
      const q = getDesignIntroQuestion(qid);
      return q?.title || qid;
    });
  }
  return {
    ...t,
    type: t.type || "名词解释",
    accessLevel: t.accessLevel || "free",
    relatedTemplateIds,
    relatedTemplates,
    relatedQuestions,
    relatedQuestionIds: t.relatedQuestionIds || []
  };
}

export function getDesignIntroTerm(id) {
  const raw = designIntroTerms.find((x) => x.id === id);
  return normalizeRawTerm(raw);
}

export function getDesignIntroTermsByChapter(chapterId) {
  return designIntroTerms.filter((t) => t.chapterId === chapterId).map((x) => normalizeRawTerm(x));
}
