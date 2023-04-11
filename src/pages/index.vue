<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Album } from '@/types/albums'

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
		},
		{
			type: 'application/ld+json',
			json: {
				'@context': 'https://schema.org/',
				'@type': 'WebSite',
				url: 'https://salvadoradrian.com/',
				name: 'Adrian Salvador'
			}
		},
		{
			type: 'application/ld+json',
			json: {
				'@context': 'https://schema.org',
				'@type': 'VideoObject',
				name: 'Introducing the self-driving bicycle in the Netherlands',
				description: 'This spring, Google is introducing the self-driving bicycle in Amsterdam, the world\'s premier cycling city. The Dutch cycle more than any other nation in the world, almost 900 kilometres per year per person, amounting to over 15 billion kilometres annually. The self-driving bicycle enables safe navigation through the city for Amsterdam residents, and furthers Google\'s ambition to improve urban mobility with technology. Google Netherlands takes enormous pride in the fact that a Dutch team worked on this innovation that will have great impact in their home country.',
				thumbnailUrl: [
					''
				],
				contentUrl: ''
			}
		}
	]
})

const { data: albumsFavorites } = await useFutch('/albums/favorites')

const { pending: pendingAlbums, data: albums, error: errorAlbums } = await useLazyAsyncData(() =>
	useFaetch('/albums')
, { immediate: process.client, default: () => shallowRef() })

const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

const { pending: pendingImages, data: randomImages, error: errorImages } = await useLazyAsyncData(() =>
	useFaetch('/images/random', { baseURL: cdnBaseURL })
, { immediate: process.client, default: () => shallowRef() })

watch(albums, (newAlbums) => {
	albums.value = newAlbums
})

watch(randomImages, (newRandomImages) => {
	randomImages.value = newRandomImages
})

const getRandomImagesView: ComputedRef<Album[]> = computed(() => {
	return randomImages.value.map((image: any) => {
		image.url = `${cdnBaseURL}/gallery/${image.album?.name}/${image.name}`
		image.thumb.url = `${cdnBaseURL}/images/${image.name}`

		return image
	})
})

const getAlbumsView: ComputedRef<Album[]> = computed(() => {
	return albums.value.data.map((album: any) => {
		album.url = `/albums/${album.id}`

		return album
	})
})
</script>

<template>
	<div>
		<SectionsHero />

		<AlbumsFavorites :albums="albumsFavorites?.data" />

		<section class="gallery-preview py-10">
			<div class="container-fluid g-6">
				<div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 justify-content-center">
					<div class="col-4 col-md-2 col-lg-auto">
						<aside class="case text-start" data-aos="fade-right">
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

							<template v-if="pendingAlbums">
								<AlbumsLoadingList title="Albums" :item-count="30" />
							</template>
							<template v-else-if="albums?.data">
								<List v-if="!errorAlbums" title="albums" :items="getAlbumsView" :more="{ url: '/albums' }" />
							</template>

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
						</aside>
					</div>

					<div class="col col-md-8 col-lg-10">
						<template v-if="pendingImages">
							<AlbumsLoadingCards data-aos="fade-up" />
						</template>
						<template v-else-if="errorImages">
							<p>{{ errorImages }}</p>
						</template>
						<template v-else-if="randomImages">
							<div data-aos="fade-up">
								<GalleryGrid id="gallery-grid" :images="getRandomImagesView" :ssr-columns="1" />
							</div>
						</template>
					</div>

					<div class="col col-md-2 col-lg-auto d-none d-md-block text-end">
						<div class="case" data-aos="fade-left">
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
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.container-fluid {
	overflow-x: clip;
}

.gallery-preview {
	min-height: 100vh;
	background: radial-gradient(ellipse at center, white 0%, #ededed 100%);
}

.case {
	padding: 0 0.875rem;
	top: 90px;
	position: sticky;
}

@media (max-width: 991.98px) {
	.case {
		top: 95px;
	}
}

.dark-mode {
	.gallery-preview {
		background: radial-gradient(ellipse at center, black 0%, #101010 100%);
	}
}
</style>
