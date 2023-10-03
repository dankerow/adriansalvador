<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
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
    },
    {
      type: 'text/javascript',
      url: 'https://player.vimeo.com/api/player.js',
      defer: true
    }
  ]
})

const { $gsap: gsap } = useNuxtApp()
const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const { data: albumsFavorites } = await useFutch<{ data: Album[] }>('/albums', {
  params: {
    favorites: true
  },
  lazy: true,
  default: () => shallowRef({ data: [] })
})

const { data: albumFeatured } = await useFutch<{ data: Album[] }>('/albums', {
  params: {
    featured: true
  },
  lazy: true,
  default: () => shallowRef({ data: [] })
})

const { pending: pendingImages, data: randomImages, error: errorImages } = await useFutch<AlbumFile[]>('/files/random', {
  lazy: true,
  default: () => shallowRef([])
})

watch(randomImages, (newRandomImages) => {
  randomImages.value = newRandomImages
})

const getRandomImagesView: ComputedRef<AlbumFile[] | []> = computed(() => {
  const data = randomImages.value || []

  return data.map((image: AlbumFile) => ({
    ...image,
    url: `${cdnBaseUrl}/s-files/${encodeURIComponent(image.name)}`
  }))
})

const rootElement: Ref<HTMLElement|null> = ref(null)
const filmsTrack: Ref<HTMLElement|null> = ref(null)
const filmsContainer: Ref<HTMLElement|null> = ref(null)
const track: Ref<HTMLElement|null> = ref(null)

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
</script>

<template>
  <div ref="rootElement">
    <SectionsHero />

    <SectionsShowcase :albums="[...albumsFavorites?.data, ...albumFeatured?.data]" />

    <section class="gallery-preview pt-5 pb-10 min-vh-100" style="height: auto; max-height: 500vh">
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
          <h1 class="display-5 fw-bold lh-1">
            Gallery
          </h1>

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

        <template v-if="pendingImages">
          <AlbumsLoadingCards
            v-motion="{
              initial: { opacity: 0, y: 100 },
              visibleOnce: {
                y: 0,
                opacity: 1
              }
            }"
          />
        </template>

        <template v-else-if="errorImages">
          <p>{{ errorImages }}</p>
        </template>

        <template v-else-if="randomImages">
          <div
            v-motion="{
              initial: { opacity: 0, y: 100 },
              visibleOnce: {
                y: 0,
                opacity: 1
              },
              transition: {
                delay: 1500
              }
            }"
          >
            <GalleryGrid :images="getRandomImagesView" :min-columns="1" :max-columns="6" />
          </div>
        </template>
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
          <h1 class="display-5 fw-bold lh-1">
            Films
          </h1>
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
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/clip00526680.mp4`" poster="@/assets/images/clip00526680.png" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0" style="flex-basis: auto">
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/Sequence 02.mp4`" />
              </div>

              <div class="d-flex justify-content-center align-items-center panel position-relative overflow-hidden vw-100 vh-100 flex-grow-0 flex-shrink-0" style="flex-basis: auto">
                <VideoPlayer :src="`${cdnBaseUrl}/s-files/reflections.mp4`" poster="@/assets/images/reflections-poster.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-4 mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                The Spot
              </div>

              <div class="card-body text-center">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/733139039?h=4e51f52b13&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />
                </div>
              </div>
            </div>
          </div>

          <div class="col-4 mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                Sophie Wake Up
              </div>

              <div class="card-body">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/756745468?h=101bafbac3&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />
                </div>
              </div>
            </div>
          </div>

          <div class="col-4 mb-3 mb-sm-0">
            <div class="card shadow">
              <div class="card-header text-center">
                Familiar Faces
              </div>

              <div class="card-body">
                <div style="padding:56.25% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/733133632?h=d9334f5298&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />
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
  box-shadow: 16px 2px 20px 20px rgb(10, 10, 10);
  background: rgb(10, 10, 10);
  overflow: hidden;
  width: 100%;
  height: 87px;

  span {
    animation: animate 2.5s linear infinite;
    background: linear-gradient(90deg, rgb(10, 10, 10), #fff, rgb(10, 10, 10)) no-repeat;
    background-size: 80%;
    color: rgb(10, 10, 10);
    background-clip: text;
    -webkit-text-stroke: 3px rgba(255, 255, 255, 0);
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
  backdrop-filter: blur(12px);
  background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.3) 10%, rgba(8, 8, 8, 0.3) 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  transition: border 0.3s ease-in-out, background-image 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-image: linear-gradient(0deg, rgba(4, 4, 4, 0.5) 10%, rgba(8, 8, 8, 0.5) 100%);
    border-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
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
