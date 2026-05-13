/**
 * 用户身份模拟（不接真实支付）
 * localStorage 键：dtp_user_role = "free" | "premium" | "coaching"
 */
export const USER_ROLE_KEY = "dtp_user_role";
/** 未在浏览器里存过身份时的默认值；若你曾选过「免费」，仍以 localStorage 为准，可在「设置」里改回高级会员 */
export const DEFAULT_USER_ROLE = "premium";

export const USER_ROLES = ["free", "premium", "coaching"];

export function isValidRole(role) {
  return USER_ROLES.includes(role);
}
