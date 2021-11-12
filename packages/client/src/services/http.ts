type QueryParams = Record<string, string | number | undefined>

export async function httpGet<T>(url: string, params: QueryParams): Promise<T> {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => query.set(key, String(value)))
  const response = await fetch(`${url}?${query.toString()}`)
  return response.json()
}

export async function httpPost<D, R>(url: string, body: D, params?: QueryParams): Promise<R> {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => query.set(key, String(value)))
  }
  const response = await fetch(`${url}?${query.toString()}`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
  return response.json()
}
