import type { FetchOptions } from 'ofetch'

export default <T>(url: string, options: FetchOptions = {}): Promise<T> => {
	const config = useRuntimeConfig()

	return $fetch(url, {
		baseURL: config.public.apiBaseURL,
		headers: {
			accept: 'application/vnd.adriansalvador.json'
		},
		...options
	})
}
