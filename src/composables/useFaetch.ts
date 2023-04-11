import type { NitroFetchOptions } from 'nitropack'

export default <T>(url: string, options: NitroFetchOptions<Request> = {}): Promise<T> => {
  const config = useRuntimeConfig()

  return $fetch(url, {
    baseURL: config.public.apiBaseURL,
    headers: {
      accept: 'application/vnd.adriansalvador.json'
    },
    ...options
  })
}
