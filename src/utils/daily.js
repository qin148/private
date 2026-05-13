/** 按「天」取稳定索引，用于今日推荐 */
export function dayIndex(seed = 0) {
  const d = new Date();
  const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(t / 86400000) + seed;
}

export function pickDaily(arr, count = 5) {
  if (!arr?.length) return [];
  const start = dayIndex(0) % arr.length;
  const out = [];
  for (let i = 0; i < count; i++) out.push(arr[(start + i) % arr.length]);
  return out;
}

export function pickOneDaily(arr) {
  if (!arr?.length) return null;
  return arr[dayIndex(1) % arr.length];
}

export function normalize(s) {
  return (s || "").toLowerCase().trim();
}

export function includesQuery(haystack, q) {
  if (!q) return true;
  return normalize(haystack).includes(normalize(q));
}
