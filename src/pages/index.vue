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
        sameAs: [
          'https://www.instagram.com/adriansalvadore/',
          'https://vimeo.com/user181229489'
        ],
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
        name: 'Reflections',
        contentUrl: 'https://cdn.salvadoradrian.com/videos/reflections.mp4'
      }
    }
  ]
})

const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

const { data: albumsFavorites } = await useFutch('/albums/favorites')

const { pending: pendingAlbums, data: albums, error: errorAlbums } = await useLazyAsyncData(() =>
  useFaetch('/albums')
, { immediate: process.client, default: () => shallowRef() })

const { pending: pendingImages, data: randomImages, error: errorImages } = await useLazyAsyncData(() =>
  useFaetch('/images/random')
, { immediate: process.client, default: () => shallowRef() })

watch(albums, (newAlbums) => {
  albums.value = newAlbums
})

watch(randomImages, (newRandomImages) => {
  randomImages.value = newRandomImages
})

const getRandomImagesView: ComputedRef<Album[]> = computed(() => {
  return randomImages.value.map((image: any) => {
    image.url = `${cdnBaseURL}/gallery/${encodeURIComponent(image.album?.name)}/${encodeURIComponent(image.name)}`

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
  <main>
    <SectionsHero />

    <SectionsShowcase :albums="albumsFavorites?.data" />

    <section class="gallery-preview min-vh-100 py-10">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-4 col-md-2 col-lg-1">
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
            </aside>
          </div>

          <div class="col col-md-8 col-lg-11">
            <template v-if="pendingImages">
              <AlbumsLoadingCards data-aos="fade-up" />
            </template>
            <template v-else-if="errorImages">
              <p>{{ errorImages }}</p>
            </template>
            <template v-else-if="randomImages">
              <div class="hstack gap-3 mb-2 justify-content-end">
                <div class="small text-body-secondary">
                  Displaying trending images
                </div>
                <div class="vr" />
                <div class="small text-body-secondary">
                  <NuxtLink to="/albums" class="text-decoration-underline">
                    Albums
                  </NuxtLink>
                </div>
              </div>
              <div data-aos="fade-up">
                <GalleryGrid id="gallery-grid" :images="getRandomImagesView" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <LazySectionsContact />
  </main>
</template>

<style lang="scss" scoped>
.container-fluid {
	overflow-x: clip;
}

.gallery-preview {
	background: radial-gradient(ellipse at center, white 0%, #ededed 100%);
  z-index: 50;
}

.case {
	padding: 0 0.25rem;
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
