const DEFAULT_BASE_URL = 'https://fakestoreapi.com'

function buildUrl(path, baseUrl = DEFAULT_BASE_URL) {
  if (!path) return baseUrl
  if (path.startsWith('http')) return path
  if (!path.startsWith('/')) return `${baseUrl}/${path}`
  return `${baseUrl}${path}`
}

async function parseJsonSafe(res) {
  // Some APIs return empty bodies for certain statuses; protect against JSON parse errors
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiGet(path, options = {}) {
  const { baseUrl, headers, ...rest } = options

  const res = await fetch(buildUrl(path, baseUrl), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(headers || {}),
    },
    ...rest,
  })

  const data = await parseJsonSafe(res)

  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === 'string' ? data : '') ||
      `Request failed with status ${res.status}`
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}
