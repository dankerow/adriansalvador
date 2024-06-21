<script setup lang="ts">
import type { Album, AlbumFile } from '@/types/albums'

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
        contentUrl: 'https://cdn.salvadoradrian.com/files/reflections.mp4'
      }
    },
    {
      type: 'application/ld+json',
      json: {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'The Spot',
        contentUrl: 'https://cdn.salvadoradrian.com/files/clip00526680.mp4'
      }
    },
    {
      type: 'application/ld+json',
      json: {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Familiar Faces',
        contentUrl: 'https://cdn.salvadoradrian.com/files/Sequence 02.mp4'
      }
    }
  ]
})

useHead({
  script: [
    {
      src: '/js/Gradient.min.js',
      defer: true
    }
  ]
})

const { $gsap: gsap } = useNuxtApp()
const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const { data: albums } = await useAsyncData<{ featured: Album[], favorites: Album[] }>('featured-albums', () => useFaetch('/albums', {
  params: {
    featured: true,
    favorites: true
  }
}),
{
  lazy: true,
  default: () => ({ featured: [], favorites: [] }),
  transform: ({ data }: { data: Album[] }) => {
    return {
      featured: data.filter((album) => album.featured).map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        url: `/albums/${album._id}`,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      })),
      favorites: data.filter((album) => album.favorite).map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        url: `/albums/${album._id}`,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      }))
    }
  }
})

const { pending: pendingImages, data: randomImages, error: errorImages } = await useFutch<Partial<AlbumFile>[]>('/files/random', {
  lazy: true,
  deep: false,
  default: () => [],
  transform: (data) => {
    return data.map((image: Partial<AlbumFile>) => ({
      _id: image._id,
      name: image.name,
      metadata: image.metadata,
      album: image.album
    }))
  }
})

const getRandomImagesView = computed<Partial<AlbumFile>[] | []>(() => {
  const data = randomImages.value

  return data.map((image: Partial<AlbumFile>) => ({
    ...image,
    url: `${cdnBaseUrl}/s-files/${encodeURIComponent(image.name)}`
  }))
})

const filmsTrack = ref<HTMLElement|null>(null)
const filmsContainer = ref<HTMLElement|null>(null)
const track = ref<HTMLElement|null>(null)

onMounted(() => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: filmsTrack.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    })
    .to(track.value, {
      xPercent: -100,
      ease: 'none'
    })
})

onUnmounted(() => {
  gsap.killTweensOf(track.value)
})
</script>

<template>
  <div>
    <SectionsHero />

    <SectionsShowcase :albums="albums" />

    <section class="gallery-preview pt-5 pb-10 min-vh-100 h-100">
      <div class="container-fluid">
        <div
          v-motion="{
            initial: {
              opacity: 0,
              x: -100
            },
            visibleOnce: {
              x: 0,
              opacity: 1
            }
          }"
          class="ms-4 mb-5"
        >
          <h2 class="display-5 fw-bold lh-1">
            Gallery
          </h2>

          <div
            v-motion="{
              initial: { opacity: 0, x: 100 },
              visibleOnce: {
                x: 0,
                opacity: 1
              }
            }"
            class="hstack gap-3"
          >
            <div class="text-body-secondary">
              Here you can find a selection of my favorite photos.
            </div>

            <div class="vr" />

            <div class="text-body-secondary">
              <NuxtLink to="/albums" class="text-decoration-underline">
                Albums
              </NuxtLink>
            </div>
          </div>
        </div>

        <AlbumsLoadingCards
          v-if="pendingImages"
          v-motion="{
            initial: { opacity: 0, y: 100 },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
        />

        <template v-else-if="errorImages">
          <p>{{ errorImages }}</p>
        </template>

        <GalleryGrid
          v-else-if="randomImages"
          :images="getRandomImagesView"
          :min-columns="1"
          :max-columns="6"
        />
      </div>
    </section>

    <section class="films position-relative pt-4 pb-10 py-lg-12">
      <div class="container-fluid">
        <div
          v-motion="{
            initial: { opacity: 0, x: -100 },
            visibleOnce: {
              x: 0,
              opacity: 1
            }
          }"
          class="ms-4"
        >
          <h2 class="display-5 fw-bold lh-1">
            Films
          </h2>

          <p class="fs-3 lh-1">
            Here you can find some of my films.
          </p>
        </div>
      </div>

      <div ref="filmsTrack" class="films-track position-relative" style="height: 300vh">
        <div ref="filmsContainer" class="align-items-stretch position-sticky d-flex overflow-hidden start-0 top-0 w-100 z-0 justify-content-start" style="bottom: auto;">
          <div ref="track" class="track position-relative h-100 flex-grow-0 flex-shrink-0" style="flex-basis: 0; transform: translate(0%, 0px);">
            <div class="d-flex h-100 align-items-stretch justify-content-start" style="margin-right: -100vw;">
              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0" style="flex-basis: auto">
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/clip00526680.mp4`" poster="/covers/clip00526680-poster.webp" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0" style="flex-basis: auto">
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/Sequence 02.mp4`" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0" style="flex-basis: auto">
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/reflections.mp4`" poster="/covers/reflections-poster.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-1 row-cols-lg-3">
          <div class="col mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                The Spot
              </div>

              <div class="card-body text-center">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe
                    title="The Spot"
                    src="https://player.vimeo.com/video/733139039?h=4e51f52b13&title=0&byline=0&portrait=0"
                    class="border-0"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    referrerpolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                Sophie Wake Up
              </div>

              <div class="card-body">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe
                    title="Sophie Wake Up"
                    src="https://player.vimeo.com/video/756745468?h=101bafbac3&title=0&byline=0&portrait=0"
                    class="border-0"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    referrerpolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                Familiar Faces
              </div>

              <div class="card-body">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe
                    title="Familiar Faces"
                    src="https://player.vimeo.com/video/733133632?h=d9334f5298&title=0&byline=0&portrait=0"
                    class="border-0"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    referrerpolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <LazySectionsContact />
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
	overflow-x: clip;
}

.overlay {
  box-shadow: 1rem 0.125rem 1.25rem 1.25rem rgb(10, 10, 10);
  background: rgb(10, 10, 10);
  height: 5.438rem;
  overflow: hidden;
  width: 100%;

  span {
    animation: animate 2.5s linear infinite;
    background: linear-gradient(90deg, rgb(10, 10, 10), #fff, rgb(10, 10, 10)) no-repeat;
    background-clip: text;
    background-size: 80%;
    color: rgb(10, 10, 10);
    -webkit-text-stroke: 0.188rem rgba(255, 255, 255, 0);
  }
}

@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}

.card {
  backdrop-filter: blur(0.75rem);
  background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.3) 10%, rgba(8, 8, 8, 0.3) 100%);
  border: 0.094rem solid rgba(255, 255, 255, 0.15);
  transition: border 0.3s ease-in-out, background-image 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.5) 10%, rgba(8, 8, 8, 0.5) 100%);
    border-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
}

.gallery-preview, .films {
  will-change: transform;
}

.gallery-preview {
	background-image: radial-gradient(ellipse at center, white 0%, #fafafa 100%);
  z-index: 50;
}

.dark-mode {
	.gallery-preview {
		background-image: radial-gradient(ellipse at center, black 0%, #101010 100%);
	}

  .card {
    background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.3) 10%, rgba(8, 8, 8, 0.3) 100%);
    border-color: rgba(100, 100, 100, 0.15);

    &:hover {
      background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.5) 10%, rgba(8, 8, 8, 0.5) 100%);
      border-color: rgba(100, 100, 100, 0.25);
    }
  }
}
</style>
