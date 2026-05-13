import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_USER_ROLE, isValidRole, USER_ROLE_KEY } from "../data/userMock.js";
import { getString, setString } from "../utils/storage.js";

const CHANGE = "dtp-user-store-change";
const RANDOM_KEY_PREFIX = "dtp_random_draws_";
export const FREE_RANDOM_DAILY_LIMIT = 5;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readRole() {
  const v = getString(USER_ROLE_KEY, DEFAULT_USER_ROLE);
  return isValidRole(v) ? v : DEFAULT_USER_ROLE;
}

function readRandomCount() {
  const k = RANDOM_KEY_PREFIX + todayKey();
  const n = parseInt(getString(k, "0"), 10);
  return Number.isFinite(n) ? n : 0;
}

function emit() {
  window.dispatchEvent(new Event(CHANGE));
}

export function useUser() {
  const [role, setRoleState] = useState(readRole);
  const [randomCount, setRandomCount] = useState(readRandomCount);

  useEffect(() => {
    const sync = () => {
      setRoleState(readRole());
      setRandomCount(readRandomCount());
    };
    window.addEventListener(CHANGE, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setRole = useCallback((next) => {
    if (!isValidRole(next)) return;
    setString(USER_ROLE_KEY, next);
    emit();
  }, []);

  const recordRandomDraw = useCallback(() => {
    if (readRole() !== "free") return;
    const k = RANDOM_KEY_PREFIX + todayKey();
    setString(k, String(readRandomCount() + 1));
    emit();
  }, []);

  const canDrawRandom = useMemo(() => {
    if (role !== "free") return true;
    return randomCount < FREE_RANDOM_DAILY_LIMIT;
  }, [role, randomCount]);

  const remainingRandom = useMemo(() => {
    if (role !== "free") return Infinity;
    return Math.max(0, FREE_RANDOM_DAILY_LIMIT - randomCount);
  }, [role, randomCount]);

  return {
    role,
    setRole,
    canDrawRandom,
    recordRandomDraw,
    remainingRandom,
    freeRandomDailyLimit: FREE_RANDOM_DAILY_LIMIT
  };
}
