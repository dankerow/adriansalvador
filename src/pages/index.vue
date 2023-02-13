<script setup lang="ts">
import { ComputedRef } from 'vue'

const runtimeConfig = useRuntimeConfig()
const { isMobile, isTablet, isDesktop } = useDevice()

definePageMeta({
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
})

const { pending: pendingAlbums, data: albums, error: errorAlbums } = await useFutch('/albums?limit=50', { lazy: true, server: false })
const { pending: pendingImages, data: randomImages, error: errorImages } = await useFutch('/albums/random', { lazy: true, server: false, baseURL: runtimeConfig.public.cdnBaseURL })

watch(albums, (newAlbums) => {
	albums.value = newAlbums
})

watch(randomImages, (newRandomImages) => {
	randomImages.value = newRandomImages
})

const ssrColumns: ComputedRef<number> = computed(() => {
	if (isMobile) {
		return 1
	} else if (isTablet) {
		return 2
	} else if (isDesktop) {
		return 6
	} else {
		return 6
	}
})
</script>

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
							<template v-if="pendingAlbums">
								<LazyHydrate when-visible>
									<AlbumsLoadingList title="Videos" :item-count="4" />
									<AlbumsLoadingList title="Musics" :item-count="4" />
									<AlbumsLoadingList title="Albums" :item-count="25" />
								</LazyHydrate>
							</template>
							<template v-else>
								<LazyHydrate when-visible>
									<List :title="$t('videos.metadata.title')">
										<template #items>
											<li>
												<a class="text" href="https://vimeo.com/733139039" target="_blank" rel="noreferrer" aria-label="The spot video clip">
													The Spot
												</a>
											</li>
											<li>
												<a class="text" href="https://vimeo.com/733134134" target="_blank" rel="noreferrer" aria-label="Reflections video clip">
													Reflections
												</a>
											</li>
											<li>
												<a class="text" href="https://vimeo.com/733133632" target="_blank" rel="noreferrer" aria-label="Familiar faces video clip">
													Familiar Faces
												</a>
											</li>
										</template>
									</List>

									<List :title="$t('musics.metadata.title')">
										<template #items>
											<li>
												<a class="text" href="https://soundcloud.com/adriansalvadore/ecstasy" target="_blank" rel="noreferrer" aria-label="Carnal Ecstasy">
													Carnal Ecstasy
												</a>
											</li>
										</template>
									</List>

									<List v-if="!errorAlbums" title="albums" :items="albums.data" />

									<List title="social" class="d-block d-sm-none">
										<template #items>
											<li>
												<a class="text" href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
													Instagram
												</a>
											</li>

											<li>
												<a class="text" href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
													Vimeo
												</a>
											</li>
										</template>
									</List>
								</LazyHydrate>
							</template>
						</div>
					</div>

					<div class="col col-md-8 col-lg-10">
						<template v-if="pendingImages">
							<LazyHydrate when-visible>
								<AlbumsLoadingCards />
							</LazyHydrate>
						</template>
						<template v-else-if="errorImages">
							<p>{{ errorImages }}</p>
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
											<a class="text" href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
												Vimeo
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

<style lang="scss" scoped>
.container-fluid {
	overflow-x: clip
}

.gallery-preview {
	min-height: 100vh;
}

.case {
	top: 90px;
}

@media (max-width: 991.98px) {
	.case {
		top: 95px;
	}
}
</style>
