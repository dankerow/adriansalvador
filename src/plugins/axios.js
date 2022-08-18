export default function({ $axios, store }) {
	$axios.onError((error) => {
		if (process.env.NODE_ENV !== 'production') console.error('[AXIOS Error]', error)
		if (process.browser) {
			if (process.env.NODE_ENV !== 'production') {
				if (error.response?.data?.message) {
					console.log(error.response.data.message)
				} else {
					console.log(error.message)
				}
			}
		}
	})
}
