<script setup lang="ts">
import { ComputedRef, Ref } from 'vue'
import { Album } from '@/types/albums'

const { t } = useI18n()

useHead({
  title: 'Albums',
  meta: [
    {
      name: 'description',
      content: () => t('albums.description')
    },
    {
      name: 'og:title',
      property: 'og:title',
      content: 'Albums - Adrian Salvador'
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: () => t('albums.description')
    }
  ]
})

const pages: Ref<number> = ref(0)
const currentPage: Ref<number> = ref(1)

const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

const { pending, data: albums, error  } = await useLazyAsyncData(() =>
  useFaetch('/albums', {
    params: {
      page: currentPage.value
    }
  })
, { watch: [currentPage], immediate: process.client, default: () => shallowRef() })

watch(albums, (newAlbums) => {
  albums.value = newAlbums
  pages.value = newAlbums.pages
})

const getCoverUrl = (album: Album) => {
  return album.cover ? `${cdnBaseURL}/covers/${encodeURIComponent(album.cover.name)}` : album.coverFallback ? `${cdnBaseURL}/gallery/${encodeURIComponent(album.name)}/${encodeURIComponent(album.coverFallback.name)}` : ''
}

const changePage = (index: number) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  currentPage.value = index
}

const getAlbumsView: ComputedRef<Album[]> = computed(() => {
  return albums.value.data.map((album: any) => {
    album.url = `/albums/${album.id}`

    return album
  })
})
</script>

<template>
  <main>
    <section class="min-vh-100 py-4">
      <Breadcrumb :links="[{ name: 'Albums' }]" class="mb-6" />

      <div class="container">
        <h1 class="h2 mb-3">
          Capturing Memories: My Photography Albums
        </h1>

        <p class="mb-4">
          Browse my collection of captivating albums and experience the beauty of our world through my lens.
          From breathtaking landscapes to intimate portraits, my albums tell a story that will leave you in awe.
          Explore now and see the world from a new perspective
        </p>

        <hr>

        <div v-if="pending" class="row row-cols-5 justify-content-center g-4 mb-6" data-aos="fade-up">
          <div v-for="(index) in 25" :key="index" class="col">
            <div class="card shadow-sm">
              <div class="card-img-top image-container d-flex align-items-center justify-content-center">
                <h2>#?</h2>
              </div>

              <div class="card-body">
                <div class="hstack">
                  <div>
                    <Icon name="ph:folder-duotone" class="me-2" />
                  </div>
                  <div>
                    <h4 class="card-title text-truncate mb-0">
                      # # # # # # # #
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="albums?.data" class="row row-cols-5 justify-content-center g-4 mb-6">
          <div v-for="album in getAlbumsView" :key="album.id" class="col">
            <div class="card shadow-sm">
              <div class="card-img-top image-container">
                <nuxt-img :src="getCoverUrl(album)" width="350" fit="cover" class="img-fluid" placeholder :alt="`${album.name}'s thumbnail`" loading="lazy" />
              </div>

              <div class="card-body">
                <div class="hstack gap-2">
                  <div>
                    <Icon v-if="album.favorite || album.featured" name="ph:folder-star-duotone" />
                    <Icon v-else name="ph:folder-duotone" />
                  </div>
                  <div class="text-truncate">
                    <h4 class="card-title mb-0">
                      {{ album.name }}
                    </h4>
                  </div>
                  <div class="ms-auto">
                    <Icon name="material-symbols:open-in-new" class="open-new" size="1em" />
                  </div>
                </div>
              </div>

              <NuxtLink
                :title="album.name"
                :to="album.url"
                class="stretched-link"
              />
            </div>
          </div>
        </div>

        <template v-else-if="error">
          <div class="alert alert-danger" role="alert">
            <h2 class="alert-heading h6 fw-bolder">
              Something went wrong
            </h2>
            <p class="mb-0">
              We couldn't load the images for this album. Please try again later.
            </p>
          </div>
        </template>
      </div>
    </section>

    <Pagination
      :current-page="currentPage"
      :pages="pages"
      @next-page="changePage(currentPage + 1)"
      @previous-page="changePage(currentPage - 1)"
      @change-page="changePage"
    />
  </main>
</template>

<style lang="scss" scoped>
section {
	background: radial-gradient(circle at center, white 0%, #ededed 100%);
}

.card {
	--bs-card-spacer-y: 0.475rem;
	--bs-card-spacer-x: 0.875rem;

	.open-new {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	&:hover {
		.open-new {
			opacity: 1;
		}

		.image-container {
			img {
				transform: scale(1.1) translate(-50%, -50%);
			}
		}
	}
}

.image-container {
	background: rgb(24, 24, 24);
	height: 120px;
	width: auto;
	position: relative;
	overflow: hidden;

	img {
		image-rendering: crisp-edges;
		transition: transform .3s ease-in-out;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: scale(1) translate(-50%, -50%);
	}
}

.dark-mode {
	section {
		background: radial-gradient(ellipse at center, #0f0f0f 0%, #101010 100%);
	}
}
</style>
