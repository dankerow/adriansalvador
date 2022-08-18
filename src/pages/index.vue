<template>
	<div>
		<LazyHydrate when-visible>
			<SectionsHero />
		</LazyHydrate>

		<LazyHydrate when-visible>
			<AlbumsFavorites />
		</LazyHydrate>

		<section class="gallery-preview">
			<div class="container-fluid">
				<div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 g-2 justify-content-center">
					<div class="col-4 col-md-2 col-lg-1">
						<div class="case sticky-top text-start" data-aos="fade-right">
							<template v-if="$fetchState.pending && !randomImages.length">
								<LazyHydrate when-visible>
									<div>
										<AlbumsLoadingList title="Videos" :item-count="4" />
										<AlbumsLoadingList title="Musics" :item-count="4" />
										<AlbumsLoadingList title="Albums" :item-count="20" />
									</div>
								</LazyHydrate>
							</template>
							<template v-else-if="$fetchState.error">
								<p>{{ $fetchState.error }}</p>
							</template>
							<template v-else>
								<LazyHydrate when-visible>
									<div>
										<List title="videos">
											<template #items>
												<li>
													<a href="https://vimeo.com/733139039" target="_blank" rel="noreferrer" aria-label="The spot video clip">
														<span class="text">
															The Spot
														</span>
													</a>
												</li>
												<li>
													<a href="https://vimeo.com/733134134" target="_blank" rel="noreferrer" aria-label="Reflections video clip">
														<span class="text">
															Reflections
														</span>
													</a>
												</li>
												<li>
													<a href="https://vimeo.com/733133632" target="_blank" rel="noreferrer" aria-label="Familiar faces video clip">
														<span class="text">
															Familiar Faces
														</span>
													</a>
												</li>
											</template>
										</List>

										<List title="musics">
											<template #items>
												<li>
													<a href="https://soundcloud.com/adriansalvadore/ecstasy" target="_blank" rel="noreferrer" aria-label="Carnal Ecstasy">
														<span class="text">
															Carnal Ecstasy
														</span>
													</a>
												</li>
											</template>
										</List>

										<List title="albums" :items="albums" />

										<List title="social" class="d-block d-sm-none">
											<template #items>
												<li>
													<a href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
														<span class="text">
															Instagram
														</span>
													</a>
												</li>

												<li>
													<a href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
														<span class="text">
															Vimeo
														</span>
													</a>
												</li>
											</template>
										</List>
									</div>
								</LazyHydrate>
							</template>
						</div>
					</div>

					<div class="col col-md-8 col-lg-10">
						<template v-if="$fetchState.pending && !randomImages.length">
							<LazyHydrate when-visible>
								<AlbumsLoadingCards />
							</LazyHydrate>
						</template>
						<template v-else-if="$fetchState.error">
							<p>{{ $fetchState.error }}</p>
						</template>
						<template v-else>
							<LazyHydrate when-visible>
								<GalleryGrid id="gallery-grid" :images="randomImages" :ssr-columns="ssrColumns" />
							</LazyHydrate>
						</template>
					</div>

					<div class="col col-md-2 col-lg-1 d-none d-md-block text-end">
						<div class="case sticky-top" data-aos="fade-left">
							<LazyHydrate when-visible>
								<List title="social">
									<template #items>
										<li>
											<a class="text" href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
												Instagram
											</a>
										</li>

										<li>
											<a href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
												<span class="text">
													Vimeo
												</span>
											</a>
										</li>
									</template>
								</List>
							</LazyHydrate>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
	components: {
		LazyHydrate
	},
	data() {
		return {
			albums: [],
			randomImages: []
		}
	},
	async fetch() {
		let albums = await fetch(`${this.$config.cdnBaseURL}/albums`, {
			headers: {
				accept: 'application/vnd.adriansalvador.json'
			}
		}).then(res => res.json())

		let randomImages = await fetch(`${this.$config.cdnBaseURL}/albums/random`, {
			headers: {
				accept: 'application/vnd.adriansalvador.json'
			}
		}).then(res => res.json())

		albums = albums.map(album => ({
			url: `/albums/${album.id}`,
			...album
		}))

		randomImages = randomImages.map(image => ({
			id: image.id,
			url: image.url,
			name: image.name,
			album: image.album || null,
			thumb: image.thumb,
			tags: {
				file: {
					'Image Width': {
						value: image.tags.file['Image Width'].value
					},
					'Image Height': {
						value: image.tags.file['Image Height'].value
					}
				}
			}
		}))

		this.albums = albums
		this.randomImages = randomImages
	},
	head() {
		return {
			script: [
				{
					type: 'application/ld+json',
					json: {
						'@context': 'https://schema.org/',
						'@type': 'Person',
						name: 'Adrian Salvador',
						jobTitle: 'Photographer',
						url: 'https://salvadoradrian.com/'
					}
				}
			]
		}
	},
	computed: {
		ssrColumns: function() {
			if (this.$device.isMobile) {
				return 1
			} else if (this.$device.isTablet) {
				return 2
			} else if (this.$device.isDesktop) {
				return 6
			} else {
				return 6
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container-fluid {
	overflow-x: clip
}

.gallery-preview {
	min-height: 100vh;
}

.case {
	top: 75px;
}

@media (max-width: 991.98px) {
	.case {
		top: 85px;
	}
}
</style>
