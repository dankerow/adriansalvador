import type { NitroFetchOptions } from 'nitropack'

export default <T>(url: string, options: NitroFetchOptions<Request> = {}): Promise<T> => {
  const config = useRuntimeConfig()

  return $fetch(url, {
    baseURL: config.apiBaseUrl,
    ...options
  })
}
