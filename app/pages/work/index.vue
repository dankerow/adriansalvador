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

const currentPage = ref<number>(1)

const { status: statusRecent, data: albumsRecent, error: errorRecent } = await useFutch<{ data: Partial<Album>[] }>('/albums', {
  key: 'recent',
  params: {
    limit: 5,
    sort: 'postedAt',
    order: 'desc'
  },
  lazy: true,
  transform: ({ data }) => {
    return {
      data: data.map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      }))
    }
  }
})

const { status: statusFavorites, data: albumsFavorites, error: errorFavorites } = await useFutch<{ data: Partial<Album>[] }>('/albums', {
  key: 'favorites',
  params: {
    favorites: true,
    featured: true
  },
  lazy: true,
  transform: ({ data }) => {
    return {
      data: data.map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      }))
    }
  }
})

const { status, data: albums, error } = await useFutch<{ data: Partial<Album>[] }>('/albums', {
  params: {
    page: currentPage.value
  },
  lazy: true,
  watch: [currentPage],
  transform: ({ data }) => {
    return {
      data: data.map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      }))
    }
  }
})
</script>

<template>
  <section class="min-vh-100 pt-10 pb-4">
    <Breadcrumb :links="[{ name: 'Work' }]" class="mb-6" />

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
        class="lead"
      >
        Browse my collection of captivating albums and experience the beauty of our world through my lens.
        From breathtaking landscapes to intimate portraits, my albums tell a story that will leave you in awe.
        Explore now and see the world from a new perspective.
      </p>

      <hr class="my-5">

      <h2 class="text-uppercase mb-5">
        Recently published albums
      </h2>

      <div
        v-if="statusRecent === 'pending'"
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visibleOnce: {
            y: 0,
            opacity: 1
          }
        }"
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6"
      >
        <div v-for="(index) in 3" :key="index" class="col">
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
                  <h3 class="card-title text-truncate mb-0">
                    # # # # # # # #
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="statusRecent === 'success' && albumsRecent?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6">
        <div v-for="album in albumsRecent.data" :key="album._id" class="col">
          <CardAlbum :album="album" />
        </div>
      </div>

      <template v-else-if="statusRecent === 'success' && !albumsRecent?.data.length">
        <div class="alert alert-secondary" role="alert">
          <h2 class="alert-heading h4 fw-bolder">
            Uhm, you caught me lacking.
          </h2>

          <p class="mb-0">
            Nothing to display here yet. Please check back later.
          </p>
        </div>
      </template>

      <template v-else-if="statusRecent === 'error' && errorRecent">
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

      <h2 class="text-uppercase mb-5">
        Featured & Favorites albums
      </h2>

      <div
        v-if="statusFavorites === 'pending'"
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visibleOnce: {
            y: 0,
            opacity: 1
          }
        }"
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6"
      >
        <div v-for="(index) in 3" :key="index" class="col">
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
                  <h3 class="card-title text-truncate mb-0">
                    # # # # # # # #
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="statusFavorites === 'success' && albumsFavorites?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6">
        <div v-for="album in albumsFavorites.data" :key="album._id" class="col">
          <CardAlbum :album="album" />
        </div>
      </div>

      <template v-else-if="statusFavorites === 'success' && !albumsFavorites?.data.length">
        <div class="alert alert-secondary" role="alert">
          <h2 class="alert-heading h4 fw-bolder">
            Uhm, you caught me lacking.
          </h2>

          <p class="mb-0">
            Nothing to display here yet. Please check back later.
          </p>
        </div>
      </template>

      <template v-else-if="statusFavorites === 'error' && errorFavorites">
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

      <h2 class="text-uppercase mb-5">
        More albums
      </h2>

      <div
        v-if="status === 'pending'"
        v-motion="{
          initial: {
            opacity: 0,
            y: 100
          },
          visibleOnce: {
            y: 0,
            opacity: 1
          }
        }"
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6"
      >
        <div v-for="(index) in 6" :key="index" class="col">
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

      <div v-else-if="status === 'success' && albums?.data.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-6">
        <div v-for="album in albums.data" :key="album._id" class="col">
          <CardAlbum :album="album" />
        </div>
      </div>

      <template v-else-if="status === 'success' && !albums?.data.length">
        <div class="alert alert-secondary" role="alert">
          <h2 class="alert-heading h4 fw-bolder">
            Uhm, you caught me lacking.
          </h2>

          <p class="mb-0">
            Nothing to display here yet. Please check back later.
          </p>
        </div>
      </template>

      <template v-else-if="status === 'error' && error">
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
</template>

<style lang="scss" scoped>
section {
	background: radial-gradient(circle at center, white 0%, #ededed 100%);
}

.dark-mode {
	section {
		background: radial-gradient(ellipse at center, #0f0f0f 0%, #101010 100%);
	}
}
</style>
