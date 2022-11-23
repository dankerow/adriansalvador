<template>
	<section class="pt-5">
		<template v-if="$fetchState.pending && !images.length">
			<div class="container">
				<div class="row align-items-center text-center text-lg-start">
					<div class="col-12 col-lg">
						<div class="row justify-content-center justify-content-md-between">
							<div class="col-12 col-lg">
								<h1 class="fs-1 fw-bold mb-0 placeholder-glow">
									<span class="placeholder col-2" />
								</h1>

								<p class="date placeholder-glow">
									<span class="placeholder col-3" />
								</p>
							</div>

							<div class="col-auto">
								<div class="row gx-2">
									<div class="col-auto">
										<button
											:class="`btn ${$colorMode.value === 'dark' ? 'btn-dark' : 'bt-gray' } disabled`"
											type="button"
											aria-label="Share Button Placeholder"
										>
											{{ $t('albums.buttons.share.metadata.title') }}
										</button>
									</div>

									<div class="col-auto">
										<button
											:class="`btn ${$colorMode.value === 'dark' ? 'btn-dark' : 'bt-gray' } disabled`"
											type="button"
											aria-label="Download Button Placeholder"
										>
											{{ $t('albums.buttons.download.metadata.title') }}
										</button>
									</div>
								</div>
							</div>
						</div>

						<hr>
					</div>

					<div class="container">
						<LazyHydrate when-visible>
							<AlbumsLoadingCards />
						</LazyHydrate>
					</div>
				</div>
			</div>
		</template>

		<template v-else-if="$fetchState.error">
			<p>{{ $fetchState.error }}</p>
		</template>

		<template v-else>
			<div class="container">
				<div class="row row-cols-1 row-cols-sm-2 align-items-center text-center text-lg-start justify-content-center justify-content-md-between">
					<div class="col">
						<h1 class="fs-1 fw-bold mb-0">
							{{ album.name }}
						</h1>

						<p class="information">
							{{ fileCount }} images
						</p>
					</div>

					<div class="col">
						<div class="row gx-2 justify-content-end">
							<div class="col col-md-auto">
								<button
									:class="`btn ${$colorMode.value === 'dark' ? 'btn-gray-dark text-light' : 'btn-gray text-primary' }`"
									type="button"
									aria-label="Share album's link"
									@click.prevent="share"
								>
									{{ $t('albums.buttons.share.metadata.title') }}
								</button>
							</div>

							<div class="col col-md-auto">
								<a
									:class="`btn ${$colorMode.value === 'dark' ? 'btn-gray-dark text-light' : 'btn-gray text-primary' }`"
									type="button"
									aria-label="Download all album's images"
									:href="`${$config.cdnBaseURL}/albums/${album.id}/download`"
									download
								>
									{{ $t('albums.buttons.download.metadata.title') }}
								</a>
							</div>
						</div>
					</div>
				</div>

				<hr>

				<div class="row row-cols-1 justify-content-center">
					<div class="col">
						<LazyHydrate when-visible>
							<GalleryGrid :id="`gallery-grid-${album.id}`" :images="images" :ssr-columns="ssrColumns" />
						</LazyHydrate>
					</div>
				</div>
			</div>

			<LazyHydrate when-visible>
				<Pagination
					:current-page="currentPage"
					:pages="pages"
					@next-page="changePage('next')"
					@previous-page="changePage('previous')"
					@change-page="changePage"
				/>
			</LazyHydrate>
		</template>
	</section>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
	components: {
		LazyHydrate
	},
	data() {
		return {
			album: {
				name: 'Loading...'
			},
			images: [],
			fileCount: 0,
			pages: 0,
			currentPage: 1
		}
	},
	async fetch() {
		const data = await fetch(`${this.$config.cdnBaseURL}/albums/${this.$route.params.id}?limit=50&page=${this.currentPage}`, {
			headers: {
				accept: 'application/vnd.adriansalvador.json'
			}
		}).then(res => res.json())

		this.album = data.album
		this.images = data.images
		this.fileCount = data.fileCount
		this.pages = data.pages
	},
	head() {
		return {
			titleTemplate: `${this.album.name} - %s`,
			meta: [
				{
					hid: 'og:title',
					prefix: 'og: https://ogp.me/ns#',
					name: 'og:title',
					property: 'og:title',
					content: `${this.album.name} - Adrian Salvador`
				},
				{
					hid: 'og:description',
					prefix: 'og: https://ogp.me/ns#',
					name: 'og:description',
					property: 'og:description',
					content: `Discover "${this.album.name}" album. | "Capturing the essence of people through a lens."`
				}
			]
		}
	},
	computed: {
		ssrColumns: function() {
			if (this.$device.isMobile) {
				return 1
			} else if (this.$device.isTablet) {
				return 3
			} else if (this.$device.isDesktop) {
				return 6
			} else {
				return 6
			}
		}
	},
	methods: {
		async share() {
			const shareData = {
				title: 'Adrian Salvador',
				text: `Discover "${this.album.name}" album.`,
				url: `https://salvadoradrian.com/albums/${this.$route.params.id}`
			}

			await navigator.share(shareData)
		},
		changePage(value) {
			switch (value) {
			case 'next':
				this.currentPage += 1
				break
			case 'previous':
				this.currentPage -= 1
				break
			default:
				this.currentPage = value
				break
			}

			this.$fetch()
		}
	}
}
</script>

<style lang="scss" scoped>
section {
	min-height: 100vh;
}

.container-fluid {
	overflow-x: clip;
}

.information {
	color: #636363;
	font-size: 0.875rem;
}
</style>
