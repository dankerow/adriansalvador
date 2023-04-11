<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'

definePageMeta({
  layout: 'gallery'
})

const colorMode = useColorMode()
const params = useRoute().params

const { data: album } = await useFutch(`/albums/${params.id}`)

const pages: Ref<number> = ref(0)
const currentPage: Ref<number> = ref(1)

const { data: images, pending: pendingImages, error: errorImages } = await useLazyAsyncData(() =>
  useFaetch(`/albums/${params.id}/images`, {
    params: {
      limit: 50,
      page: currentPage.value
    }
  })
, { watch: [currentPage], immediate: process.client, default: () => shallowRef() })

watch(images, (newImages) => {
  images.value = newImages
  pages.value = newImages.pages
})

useHead({
  title: () => album.value.name,
  meta: [
    {
      name: 'og:title',
      property: 'og:title',
      content: () => `${album.value.name} - Adrian Salvador`
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: () => `Discover "${album.value.name}" album. | "Capturing the essence of people through a lens."`
    }
  ]
})

const share = async () => {
  const shareData = {
    title: 'Adrian Salvador',
    text: `Discover "${album.value.name}" album.`,
    url: `https://salvadoradrian.com/albums/${params.id}`
  }

  await navigator.share(shareData)
}

const changePage = (index: number) => {
  currentPage.value = index
}

const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

const getImagesView: ComputedRef<object[]> = computed(() => {
  return images.value.data.map((image: any) => {
    image.url = `${cdnBaseURL}/gallery/${album.value.name}/${image.name}`
    image.thumb.url = `${cdnBaseURL}/images/${image.name}`

    return image
  })
})
</script>

<template>
  <div>
    <section class="min-vh-100 pt-4">
      <Breadcrumb :links="[{ name: 'Albums', path: '/albums' }, { name: album.name }]" class="mb-6" />

      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 align-items-center text-center text-lg-start justify-content-center justify-content-md-between" data-aos="fade-down">
          <div class="col">
            <h1 class="h3 fw-bold mb-0">
              {{ album.name }}
            </h1>

            <p class="information">
              {{ album.fileCount }} images
            </p>
          </div>

          <div class="col">
            <div class="row gx-2 justify-content-end">
              <div class="col col-md-auto">
                <button
                  :class="`btn ${colorMode.value !== 'light' ? 'btn-gray-dark text-light' : 'btn-gray text-primary'}`"
                  type="button"
                  aria-label="Share album's link"
                  @click.prevent="share"
                >
                  {{ $t('albums.buttons.share.metadata.title') }}
                </button>
              </div>

              <div class="col col-md-auto">
                <a
                  :class="`btn ${colorMode.value !== 'light' ? 'btn-gray-dark text-light' : 'btn-gray text-primary'}`"
                  type="button"
                  aria-label="Download all album's images"
                  :href="`${cdnBaseURL}/albums/${album.id}/download`"
                  download
                >
                  {{ $t('albums.buttons.download.metadata.title') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <div class="row row-cols-1 justify-content-center" data-aos="fade-up">
          <div class="col">
            <AlbumsLoadingCards v-if="pendingImages" />
            <GalleryGrid v-else-if="images?.data" :id="`gallery-grid-${album.id}`" :images="getImagesView" :ssr-columns="1" />
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
        </div>
      </div>
    </section>

    <Pagination
      :current-page="currentPage"
      :pages="pages"
      @next-page="changePage(currentPage + 1)"
      @previous-page="changePage(currentPage - 1)"
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
	font-size: 0.875rem;
}

.dark-mode {
	section {
		background: radial-gradient(ellipse at center, #0f0f0f 0%, #101010 100%);
	}
}
</style>
