<script setup lang="ts">
import type { Album } from '@/types/albums'

useHead({
  title: 'Albums',
  meta: [
    {
      name: 'description',
      content: 'Collections of my favorite photos from my travels and adventures.'
    },
    {
      name: 'og:title',
      property: 'og:title',
      content: 'Albums - Adrian Salvador'
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: 'Collections of my favorite photos from my travels and adventures.'
    }
  ]
})

const pages = ref<number>(0)
const currentPage = ref<number>(1)

const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const { pending: pendingRecent, data: albumsRecent, error: errorRecent } = await useFutch<{ data: Album[] }>('/albums', {
  key: 'recent',
  params: {
    limit: 5,
    sort: 'postedAt',
    order: 'desc'
  },
  lazy: true,
  default: () => shallowRef()
})

const { pending: pendingFavorites, data: albumsFavorites, error: errorFavorites } = await useFutch<{ data: Album[] }>('/albums', {
  key: 'favorites',
  params: {
    favorites: true
  },
  lazy: true,
  default: () => shallowRef()
})

const { pending, data: albums, error } = await useFutch<{ albums: Album[], pages: number }>('/albums', {
  params: {
    page: currentPage.value
  },
  lazy: true,
  watch: [currentPage],
  default: () => shallowRef()
})

watch(albumsRecent, (newAlbums) => {
  albumsRecent.value = newAlbums
})

watch(albumsFavorites, (newAlbums) => {
  albumsFavorites.value = newAlbums
})

watch(albums, (newAlbums) => {
  albums.value = newAlbums
  pages.value = newAlbums.pages
})

const getCoverUrl = (album: Album) => {
  return album.cover ? `${cdnBaseUrl}/covers/${encodeURIComponent(album.cover.name)}` : album.coverFallback ? `${cdnBaseUrl}/s-files/${encodeURIComponent(album.coverFallback.name)}` : ''
}

const changePage = (index: number) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  currentPage.value = index
}
</script>

<template>
  <div>
    <section class="min-vh-100 py-4">
      <Breadcrumb :links="[{ name: 'Albums' }]" class="mb-6" />

      <div class="container">
        <h1
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="mb-3"
        >
          Capturing Memories: My Photography Albums
        </h1>

        <p
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
        >
          Browse my collection of captivating albums and experience the beauty of our world through my lens.
          From breathtaking landscapes to intimate portraits, my albums tell a story that will leave you in awe.
          Explore now and see the world from a new perspective.
        </p>

        <hr class="my-5">

        <h2 class="mb-4">
          Recently published albums
        </h2>

        <div
          v-if="pendingRecent"
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6"
        >
          <div v-for="(index) in 5" :key="index" class="col">
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

        <div v-else-if="albumsRecent?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6">
          <div v-for="album in albumsRecent.data" :key="album.id" class="col">
            <div class="card shadow-sm">
              <div class="card-img-top image-container">
                <nuxt-img
                  :src="getCoverUrl(album)"
                  width="380"
                  fit="cover"
                  class="img-fluid"
                  :alt="`${album.name}'s thumbnail`"
                  loading="lazy"
                />
              </div>

              <div class="card-body">
                <div class="hstack gap-2">
                  <div>
                    <Icon name="ph:folder-duotone" />
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
                :to="`/albums/${album.id}`"
                class="stretched-link"
              />
            </div>
          </div>
        </div>

        <template v-else-if="!albumsRecent?.data.length">
          <div class="alert alert-secondary" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Uhm, you caught me lacking.
            </h2>
            <p class="mb-0">
              Nothing to display here yet. Please check back later.
            </p>
          </div>
        </template>

        <template v-else-if="errorRecent">
          <div class="alert alert-danger" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Something went wrong
            </h2>
            <p class="mb-0">
              We couldn't load the albums. Please try again later.
            </p>
          </div>
        </template>

        <hr>

        <h2 class="mb-4">
          Featured & Favorites albums
        </h2>

        <div
          v-if="pendingFavorites"
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6"
        >
          <div v-for="(index) in 5" :key="index" class="col">
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

        <div v-else-if="albumsFavorites?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6">
          <div v-for="album in albumsFavorites.data" :key="album.id" class="col">
            <div class="card shadow-sm">
              <div class="card-img-top image-container">
                <nuxt-img
                  :src="getCoverUrl(album)"
                  width="380"
                  fit="cover"
                  class="img-fluid"
                  :alt="`${album.name}'s thumbnail`"
                  loading="lazy"
                />
              </div>

              <div class="card-body">
                <div class="hstack gap-2">
                  <div>
                    <Icon name="ph:folder-duotone" />
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
                :to="`/albums/${album.id}`"
                class="stretched-link"
              />
            </div>
          </div>
        </div>

        <template v-else-if="!albumsFavorites?.data.length">
          <div class="alert alert-secondary" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Uhm, you caught me lacking.
            </h2>
            <p class="mb-0">
              Nothing to display here yet. Please check back later.
            </p>
          </div>
        </template>

        <template v-else-if="errorFavorites">
          <div class="alert alert-danger" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Something went wrong
            </h2>
            <p class="mb-0">
              We couldn't load the albums. Please try again later.
            </p>
          </div>
        </template>

        <hr>

        <h2 class="mb-4">
          More albums
        </h2>

        <div
          v-if="pending"
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6"
        >
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

        <div v-else-if="albums?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-6">
          <div v-for="album in albums.data" :key="album.id" class="col">
            <div class="card shadow-sm">
              <div class="card-img-top image-container">
                <nuxt-img
                  :src="getCoverUrl(album)"
                  width="380"
                  fit="cover"
                  class="img-fluid"
                  :alt="`${album.name}'s thumbnail`"
                  loading="lazy"
                />
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
                :to="`/albums/${album.id}`"
                class="stretched-link"
              />
            </div>
          </div>
        </div>

        <template v-else-if="!albums?.data.length">
          <div class="alert alert-secondary" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Uhm, you caught me lacking.
            </h2>
            <p class="mb-0">
              Nothing to display here yet. Please check back later.
            </p>
          </div>
        </template>

        <template v-else-if="error">
          <div class="alert alert-danger" role="alert">
            <h2 class="alert-heading h4 fw-bolder">
              Something went wrong
            </h2>
            <p class="mb-0">
              We couldn't load the albums. Please try again later.
            </p>
          </div>
        </template>
      </div>
    </section>

    <!-- <Pagination
      :current-page="currentPage"
      :pages="pages"
      @next-page="changePage(currentPage + 1)"
      @previous-page="changePage(currentPage - 1)"
      @change-page="changePage"
    /> -->
  </div>
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
