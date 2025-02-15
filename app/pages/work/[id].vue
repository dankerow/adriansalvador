<script setup lang="ts">
import type { Album, AlbumFile } from '@/types/albums'

const colorMode = useColorMode()
const params = useRoute().params
const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const { data: album } = await useFutch<Album>(`/albums/${params.id}`)

if (!album.value) {
  throw createError({ statusCode: 404, statusMessage: 'Album Not Found' })
}

const currentPage = ref<number>(1)

const { data: images, pending: pendingImages, error: errorImages } = await useFutch<{ data: Partial<AlbumFile>[], count: number, pages: number }>(`/albums/${params.id}/files`,
  {
    params: {
      limit: 50,
      page: currentPage
    },
    lazy: true,
    watch: [currentPage],
    default: () => ({ data: [], count: 0, pages: 0 }),
    transform: ({ data, count, pages }) => {
      return {
        data: data.map((image) => ({
          _id: image._id,
          name: image.name,
          url: `${cdnBaseUrl}/s-files/${encodeURIComponent(image.name)}`,
          metadata: image.metadata
        })),
        count,
        pages
      }
    }
  })

useHead({
  title: () => album.value!.name,
  meta: [
    {
      name: 'og:title',
      property: 'og:title',
      content: () => `${album.value!.name} - Adrian Salvador`
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: () => `Discover "${album.value!.name}" album. | "Capturing the essence of people through a lens."`
    }
  ]
})

const share = async () => {
  const shareData = {
    title: 'Adrian Salvador',
    text: `Discover "${album.value!.name}" album.`,
    url: `https://salvadoradrian.com/albums/${params.id}`
  }

  await navigator.share(shareData)
}

const changePage = (index: number) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  currentPage.value = index
}

const onDownload = async () => {
  useTrackEvent('download', {
    category: 'albums',
    label: album.value.name
  })
}
</script>

<template>
  <div>
    <section class="min-vh-100 pt-10 pb-4">
      <Breadcrumb :links="[{ name: 'Work', path: '/work' }, { name: album!.name }]" class="mb-7" />

      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 align-items-center text-start justify-content-center justify-content-md-between">
          <div class="col mb-4 mb-md-0">
            <h1 class="display-6 text-body-emphasis fw-bold mb-0">
              {{ album!.name }}
            </h1>

            <p class="information">
              {{ album!.fileCount }} images
            </p>
          </div>

          <div class="col">
            <div class="row gx-2 justify-content-between justify-content-md-end">
              <div class="col-auto">
                <button
                  :class="`btn ${colorMode.value !== 'light' ? 'btn-light' : 'btn-gray text-primary'}`"
                  type="button"
                  aria-label="Share album's link"
                  @click.prevent="share"
                >
                  Share Album
                </button>
              </div>

              <div class="col-auto">
                <a
                  :class="`btn ${colorMode.value !== 'light' ? 'btn-light' : 'btn-gray text-primary'}`"
                  type="button"
                  aria-label="Download all album's images"
                  :href="`${cdnBaseUrl}/albums/${album?._id}/download`"
                  rel="noreferrer"
                  download
                  @click.stop="onDownload"
                >
                  Download Album
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <AlbumsLoadingCards v-if="pendingImages" />
        <GalleryGrid v-else-if="images && images.data" :images="images.data" />
        <template v-else-if="errorImages">
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
      :pinned="true"
      :current-page="currentPage"
      :pages="images?.pages"
      @change-page="changePage"
    />
  </div>
</template>

<style lang="scss" scoped>
section {
	background: radial-gradient(circle at center, white 0%, #ededed 100%);
}

.information {
	color: #636363;
}

.dark-mode {
	section {
		background: radial-gradient(ellipse at center, #0f0f0f 0%, #101010 100%);
	}
}
</style>
