const CACHE_TTL = 5 * 60 * 1000

const memCache = new Map()

export function cacheGet(key) {
  const item = memCache.get(key)
  if (!item) {
    try {
      const stored = localStorage.getItem(`tmci_cache_${key}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Date.now() < parsed.expiry) {
          memCache.set(key, parsed)
          return parsed.data
        }
        localStorage.removeItem(`tmci_cache_${key}`)
      }
    } catch {}
    return null
  }
  if (Date.now() > item.expiry) {
    memCache.delete(key)
    return null
  }
  return item.data
}

export function cacheSet(key, data, ttl = CACHE_TTL) {
  const item = { data, expiry: Date.now() + ttl }
  memCache.set(key, item)
  try {
    localStorage.setItem(`tmci_cache_${key}`, JSON.stringify(item))
  } catch {}
}

export function cacheClear(key) {
  memCache.delete(key)
  try { localStorage.removeItem(`tmci_cache_${key}`) } catch {}
}

export function cacheClearAll() {
  memCache.clear()
  Object.keys(localStorage)
    .filter(k => k.startsWith('tmci_cache_'))
    .forEach(k => localStorage.removeItem(k))
}