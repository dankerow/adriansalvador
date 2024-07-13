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
        url: `/work/${album._id}`,
        cover: album.cover,
        coverFallback: album.coverFallback,
        favorite: album.favorite,
        featured: album.featured
      })),
      favorites: data.filter((album) => album.favorite).map((album: Partial<Album>) => ({
        _id: album._id,
        name: album.name,
        url: `/work/${album._id}`,
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
      <div class="container-fluid px-4">
        <div
          v-motion="{
            initial: {
              opacity: 0,
              y: -100
            },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="text-uppercase ms-4 mb-5"
        >
          <h2 class="display-5 fw-bold lh-1 mb-2">
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
            class="text-body-secondary hstack gap-3"
          >
            <div>
              Here you can find a selection of my favorite photos.
            </div>

            <div class="vr" />

            <div>
              <NuxtLink to="/work" class="text-decoration-underline link-offset-3 link-underline link-underline-opacity-25 link-underline-opacity-75-hover">
                See more of my work
              </NuxtLink>
            </div>
          </div>
        </div>

        <AlbumsSkeleton
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
            initial: {
              opacity: 0,
              y: -100
            },
            visibleOnce: {
              y: 0,
              opacity: 1
            }
          }"
          class="ms-4 text-uppercase"
        >
          <h2 class="display-5 fw-bold lh-1 mb-2">
            Films
          </h2>

          <p class="lead text-body-secondary">
            Here you can find some of my films.
          </p>
        </div>
      </div>

      <div ref="filmsTrack" class="films-track position-relative" style="height: 300vh">
        <div ref="filmsContainer" class="align-items-stretch position-sticky d-flex overflow-hidden start-0 top-0 w-100 z-0 justify-content-start" style="bottom: auto;">
          <div ref="track" class="track position-relative h-100 flex-grow-0 flex-shrink-0" style="flex-basis: 0; transform: translate(0%, 0px);">
            <div class="d-flex h-100 align-items-stretch justify-content-start" style="margin-right: -100vw;">
              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0 flex-column" style="flex-basis: auto">
                <h2 class="text-uppercase mt-5">a stoner's archive</h2>
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/clip00526680.mp4`" poster="/covers/clip00526680-poster.webp" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0 flex-column" style="flex-basis: auto">
                <h2 class="text-uppercase mt-5">teaching a cat how to roll a joint</h2>
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/Sequence 02.mp4`" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0 flex-column" style="flex-basis: auto">
                <h2 class="text-uppercase mt-5">reflections</h2>
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/reflections.mp4`" poster="/covers/reflections-poster.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 g-4">
          <div class="col">
            <ScriptVimeoPlayer
              :id="733139039"
              url="https://vimeo.com/733139039"
              :responsive="true"
              :title="true"
              :byline="false"
              :portrait="false"
            />
          </div>

          <div class="col">
            <ScriptVimeoPlayer
              :id="756745468"
              url="https://vimeo.com/756745468"
              :title="true"
              :responsive="true"
              :byline="false"
              :portrait="false"
            />
          </div>

          <div class="col">
            <ScriptVimeoPlayer
              :id="733133632"
              url="https://vimeo.com/733133632"
              :title="true"
              :responsive="true"
              :byline="false"
              :portrait="false"
            />
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

.gallery-preview, .films {
  will-change: transform;
}

.gallery-preview {
	background-image: radial-gradient(ellipse at center, white 0%, #fafafa 100%);
  z-index: 50;
}

.films {
  background-image: radial-gradient(circle at center, white 0%, #fafafa 100%);
}

.dark-mode {
	.gallery-preview {
		background-image: radial-gradient(ellipse at center, black 0%, #101010 100%);
	}

  .films {
    background-image: radial-gradient(circle at center, black 0%, #101010 100%);
  }
}
</style>
