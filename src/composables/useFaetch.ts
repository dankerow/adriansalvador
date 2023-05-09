import type { NitroFetchOptions } from 'nitropack'
import defu from 'defu'

export default <T>(url: string, options: NitroFetchOptions<Request> = {}): Promise<T> => {
  const config = useRuntimeConfig()

  const defaults: NitroFetchOptions<Request> = {
    baseURL: config.apiBaseUrl
  }

  const params = defu(options, defaults)

  return $fetch(url, params)
}
