import type { UseFetchOptions } from 'nuxt/app'
import defu from 'defu'

export default <T>(url: string, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,

    key: url
  }

  const params = defu(defaults, options)

  return useFetch(url, params)
}
