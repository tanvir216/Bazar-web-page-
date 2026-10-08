"use client";
import { useCallback, useEffect, useState } from "react";

const BASES = [
  process.env.NEXT_PUBLIC_API_BASE || "https://api.api-store.workers.dev/api/bazardor",
  process.env.NEXT_PUBLIC_API_BASE_ALT || "https://api.abcz.workers.dev/api/bazardor",
];

const cache = new Map<string, Promise<unknown>>();

async function request(path: string): Promise<unknown> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("Request failed");
}

export function apiGet(path: string) {
  if (!cache.has(path)) {
    const p = request(path).catch((e) => {
      cache.delete(path);
      throw e;
    });
    cache.set(path, p);
  }
  return cache.get(path)!;
}

export function useApi<T>(path: string | null, map: (json: unknown) => T) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!!path);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!path) return;
    let alive = true;
    setLoading(true);
    setError(null);
    apiGet(path)
      .then((j) => alive && setData(map(j)))
      .catch((e) => alive && setError(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, tick]);

  const retry = useCallback(() => {
    if (path) cache.delete(path);
    setTick((t) => t + 1);
  }, [path]);

  return { data, error, loading, retry };
}
