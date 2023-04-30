import { UseFetchOptions } from '#app'

export default (url: string, options: UseFetchOptions<object> = {}) => {
  const config = useRuntimeConfig()

  return useFetch(url, {
    baseURL: options.baseURL ?? config.apiBaseUrl,
    ...options
  })
}
