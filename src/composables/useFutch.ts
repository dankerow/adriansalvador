import { UseFetchOptions } from '#app'

export default (url: string, options: UseFetchOptions<object> = {}) => {
  const config = useRuntimeConfig()

  return useFetch(url, {
    baseURL: options.baseURL ?? config.public.apiBaseURL,
    headers: {
      accept: 'application/vnd.adriansalvador.json'
    },
    ...options
  })
}
