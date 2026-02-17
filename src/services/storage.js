export function loadMeta(key = 'mental-calc-meta') {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return { streak: 0, lastSuccess: null }
    return JSON.parse(raw)
  } catch { return { streak: 0, lastSuccess: null } }
}

export function saveMeta(meta, key = 'mental-calc-meta') {
  try { localStorage.setItem(key, JSON.stringify(meta)) } catch {}
}
