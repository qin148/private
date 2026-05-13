export const warmQuotes = [
  "慢慢背，理论会长进你的表达里。",
  "不是今天背完一本书，而是今天真正理解一个概念。",
  "你不是在背资料，你是在训练自己的设计表达。",
  "考研理论的核心，不是记住所有话，而是能组织出自己的答案。",
  "每天一点点，最后会变成很扎实的底气。",
  "先搭框架，再填内容，答题就不会乱。",
  "不用和别人比进度，先把自己的框架搭稳。",
  "今天背不完也没关系，重要的是你没有停下来。",
  "先理解，再记忆，最后才能自然写出来。",
  "答题不是堆知识点，而是把逻辑讲清楚。",
  "一道题会写，比十道题看过更重要。",
  "你现在背下来的每一个概念，都会变成考场上的底气。",
  "今天也不用背很多，先把一个概念真正理解清楚。"
];

export function pickWarmQuote(seed = 0) {
  if (!warmQuotes.length) return "";
  const d = new Date();
  const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) + seed;
  return warmQuotes[t % warmQuotes.length];
}
