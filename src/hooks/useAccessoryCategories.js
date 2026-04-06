import { useEffect, useMemo, useState } from 'react';
import { fetchDistinctProductCategories } from '../services/products.js';

let cache = null;
let inflight = null;

function loadCategories() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetchDistinctProductCategories().then((result) => {
    cache = result;
    inflight = null;
    return result;
  });
  return inflight;
}

export function useAccessoryCategories() {
  const [categories, setCategories] = useState(() => cache?.categories ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(cache?.error ?? null);

  useEffect(() => {
    let cancelled = false;
    loadCategories().then((result) => {
      if (cancelled) return;
      setCategories(result.categories);
      setError(result.error);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const slugSet = useMemo(
    () => new Set(categories.map((c) => c.slug)),
    [categories]
  );

  return { categories, slugSet, loading, error };
}
