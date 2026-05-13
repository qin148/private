/**
 * 权限：free < premium < coaching
 * accessLevel: free | premium | coaching
 */

const RANK = { free: 0, premium: 1, coaching: 2 };

export function roleRank(role) {
  return RANK[role] ?? 0;
}

export function accessRank(level) {
  return RANK[level] ?? 0;
}

/** 当前身份是否可查看该 accessLevel 的完整内容 */
export function canViewFull(role, accessLevel) {
  const r = roleRank(role);
  const need = accessRank(accessLevel || "free");
  return r >= need;
}

/** 是否需要显示会员锁定（有预览、无全文） */
export function needsMemberLock(role, accessLevel) {
  if (!accessLevel || accessLevel === "free") return false;
  return !canViewFull(role, accessLevel);
}

/**
 * 预览：取文本前若干字（按字符数，适合中文）
 * @param {string} text
 * @param {number} ratio 0.2 - 0.3
 */
export function previewText(text, ratio = 0.26) {
  if (!text || typeof text !== "string") return "";
  const strip = text.replace(/\*\*/g, "");
  const n = Math.max(40, Math.ceil(strip.length * ratio));
  let out = "";
  let i = 0;
  for (const ch of text) {
    out += ch;
    if (++i >= n) break;
  }
  if (out.length < text.length) out += "…";
  return out;
}
