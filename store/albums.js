export const state = () => ({
	list: [],
	isListLoading: false
})

export const actions = {
	async fetch({ commit }) {
		commit('albumsRequest')
		const albums = await this.$axios.$get('cdn/albums/preview')

		commit('setAlbums', albums)

		return albums
	},
	async createAlbum({ commit }, name) {
		const response = await this.$axios.$post('cdn/album/add', { name })

		commit('addAlbum', response.data)

		return response
	},
	async deleteAlbum({ commit }, albumId) {
		const response = await this.$axios.$delete(`cdn/album/${albumId}`)

		commit('removeAlbum', albumId)

		return response
	},
	async toggleNsfw({ commit }, { albumId, nsfw }) {
		const response = await this.$axios.$post('cdn/album/edit', {
			id: albumId,
			nsfw
		})
		commit('updateNsfw', { albumId, nsfw })

		return response
	}
}

export const mutations = {
	albumsRequest(state) {
		state.isLoading = true
	},
	setAlbums(state, albums) {
		state.list = albums
		state.isLoading = false
	},
	addAlbum(state, album) {
		state.list.unshift(album)
	},
	removeAlbum(state, albumId) {
		// state.list = state.list.filter(({ id }) => id !== albumId);
		const foundIndex = state.list.findIndex(({ id }) => id === albumId)
		state.list.splice(foundIndex, 1)
	},
	updateNsfw(state, { albumId, nsfw }) {
		state.list.find(el => el.id === albumId).nsfw = nsfw
	}
}
