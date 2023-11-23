<script setup lang="ts">
import type { Album } from '@/types/albums'

import VanillaTilt from 'vanilla-tilt'

const props = withDefaults(defineProps<{
  albums?: Album[]
}>(), {
  albums: () => []
})
const { isDesktop } = useDevice()
const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const albums = ref<Album[]>(props.albums ?? [])

const getCover = (album: Album) => {
  return album.cover ?? album.coverFallback
}

const getCoverUrl = (album: Album) => {
  return album.cover ? `${cdnBaseUrl}/covers/${encodeURIComponent(album.cover.name)}` : album.coverFallback ? `${cdnBaseUrl}/s-files/${encodeURIComponent(album.coverFallback.name)}` : ''
}

const favorites = computed<Album[]>(() => {
  return albums.value.filter((album) => album.favorite).map((album) => {
    album.url = `/albums/${album.id}`

    return album
  })
})

const featured = computed<Album|null>(() => {
  const album = albums.value?.find((album) => album.featured)
  if (!album) return null

  album.url = `/albums/${album.id}`
  return album
})

onMounted(() => {
  if (isDesktop) {
    const tiltElements = document.querySelectorAll('.tilt') as unknown as HTMLElement[]
    VanillaTilt.init(tiltElements, {
      reverse: true
    })
  }
})
</script>

<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4 g-lg-0 justify-content-center">
    <div class="col-lg-2">
      <div
        v-motion="{
          initial: { opacity: 0, x: -100 },
          visibleOnce: {
            x: 0,
            opacity: 1
          }
        }"
        class="card card-showcase card-sm"
        tabindex="-1"
      >
        <div class="cover">
          <nuxt-img
            v-if="favorites[0] && getCover(favorites[0])"
            format="webp"
            :src="getCoverUrl(favorites[0])"
            :width="460"
            :height="(460 / getCover(favorites[0]).metadata.width) * getCover(favorites[0]).metadata.height"
            sizes="sm:100vw md:50vw lg:460px xl:660px"
            alt="Album's cover"
            loading="lazy"
          />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[0] ? favorites[0].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[0] && favorites[0].url"
          :to="favorites[0]?.url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
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
        class="card card-showcase"
      >
        <div class="cover">
          <nuxt-img
            v-if="favorites[1] && getCover(favorites[1])"
            format="webp"
            :src="getCoverUrl(favorites[1])"
            :width="500"
            :height="(500 / getCover(favorites[1]).metadata.width) * getCover(favorites[1]).metadata.height"
            sizes="sm:100vw md:50vw lg:500px xl:700px"
            alt="Album's cover"
            loading="lazy"
          />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[1] ? favorites[1].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[1] && favorites[1].url"
          :to="favorites[1].url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-3">
      <div
        v-motion="{
          initial: {
            scale: 0,
            opacity: 0
          },
          visibleOnce: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 400
            }
          }
        }"
        class="card card-showcase featured tilt"
      >
        <span class="featured-badge">
          Featured
        </span>

        <div class="cover">
          <nuxt-img
            v-if="featured"
            format="webp"
            :src="getCoverUrl(featured)"
            :width="560"
            :height="(560 / getCover(featured).metadata.width) * getCover(featured).metadata.height"
            sizes="sm:100vw md:50vw lg:460px xl:760px"
            alt="Album's cover"
            loading="lazy"
          />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ featured ? featured.name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="featured && featured.url"
          :to="featured?.url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
      <div
        v-motion="{
          initial: { opacity: 0, x: 100 },
          visibleOnce: {
            x: 0,
            opacity: 1
          }
        }"
        class="card card-showcase"
      >
        <div class="cover">
          <nuxt-img
            v-if="favorites[2] && getCover(favorites[2])"
            format="webp"
            :src="getCoverUrl(favorites[2])"
            :width="500"
            :height="(500 / getCover(favorites[2]).metadata.width) * getCover(favorites[2]).metadata.height"
            sizes="sm:100vw md:50vw lg:500px xl:700px"
            alt="Album's cover"
            loading="lazy"
          />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="card-title album-title">
            {{ favorites[2] ? favorites[2].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[2] && favorites[2].url"
          :to="favorites[2]?.url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
      <div
        v-motion="{
          initial: { opacity: 0, x: 100 },
          visibleOnce: {
            x: 0,
            opacity: 1
          }
        }"
        class="card card-showcase card-sm"
        tabindex="-1"
      >
        <div class="cover">
          <nuxt-img
            v-if="favorites[3] && getCover(favorites[3])"
            format="webp"
            :src="getCoverUrl(favorites[3])"
            :width="460"
            :height="(460 / getCover(favorites[3]).metadata.width) * getCover(favorites[3]).metadata.height"
            sizes="sm:100vw md:50vw lg:460px xl:660px"
            alt="Album's cover"
            loading="lazy"
          />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[3] ? favorites[3].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[3] && favorites[3].url"
          :to="favorites[3]?.url"
          class="stretched-link"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-showcase {
  background-color: rgb(14, 14, 14);
  border: none;
  border-radius: 0.30rem;
  color: #fff;
  margin: 10px 0 60px;
  position: relative;
  height: calc(500px + 10vw);
  text-align: center;
  z-index: 1;

  &:hover {
    > .cover {
      filter: grayscale(0);
    }

    > .card-body {
      .album-title {
        color: #fff;
        text-shadow: 0 2px 0 #5f5f5f;
      }
    }
  }

  &.featured {
    border-top: 3px solid rgb(27, 27, 27);
    margin: -30px -20px 0;
    height: 100%;
    z-index: 2;

    .featured-badge {
      background-color: rgb(27, 27, 27);
      border-radius: 0.25rem;
      color: #fff;
      display: inline-block;
      position: absolute;
      left: calc(50% - 49px);
      line-height: 1;
      padding: 4px 20px 5px 20px;
      font-size: 12px;
      text-align: center;
      text-transform: uppercase;
      top: -11px;
      user-select: none;
      z-index: 2;
    }
  }

  .cover {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.30rem;
    filter: grayscale(100%);
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: filter 300ms linear;
    width: 100%;

    img {
      border-radius: 0.30rem;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .overlay {
      background-image: linear-gradient(to bottom, rgba(3, 3, 7, 0.3), rgba(4, 4, 12, 0.8));
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: .08s;
    }
  }

  .card-body {
    position: relative;

    .album-title {
      bottom: 0;
      color: #9c9c9c;
      font-size: 20px;
      font-weight: 800;
      left: 0;
      padding: 0 1rem;
      position: absolute;
      right: 0;
      text-transform: uppercase;
      text-shadow: 0 2px 0 #1b1b1b;
      transition: color 300ms ease-in-out, text-shadow 300ms ease-in-out;
      user-select: none;
    }
  }

  &.card-sm {
    margin: 30px -10px 60px;
    height: calc(460px + 10vw);
    z-index: 0;

    .card-body {
      .album-title {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 991.98px) {
	.card-showcase {
		margin: unset !important;

		&.featured {
			margin: unset !important;
			height: 500px !important;
		}

		&.card-sm {
			margin: unset !important;
			height: 500px !important;
		}
	}
}

.dark-mode {
  .card-showcase {
    &.featured {
      border-top: 3px solid rgb(70, 70, 70);

      .featured-badge {
        background-color: rgb(37, 37, 37);
        border: 3px solid rgb(77, 77, 77);
      }
    }
  }
}
</style>
