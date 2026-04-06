import { useEffect, useMemo, useState } from 'react';
import { fetchDistinctFestivals } from '../services/products.js';

let cache = null;
let inflight = null;

function loadFestivals() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetchDistinctFestivals().then((result) => {
    cache = result;
    inflight = null;
    return result;
  });
  return inflight;
}

export function useAccessoryFestivals() {
  const [festivals, setFestivals] = useState(() => cache?.festivals ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(cache?.error ?? null);

  useEffect(() => {
    let cancelled = false;
    loadFestivals().then((result) => {
      if (cancelled) return;
      setFestivals(result.festivals);
      setError(result.error);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const slugSet = useMemo(
    () => new Set(festivals.map((f) => f.slug)),
    [festivals]
  );

  return { festivals, slugSet, loading, error };
}
