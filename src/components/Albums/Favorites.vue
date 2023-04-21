<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import type { Album } from '@/types/albums'

import VanillaTilt from 'vanilla-tilt'

const props = withDefaults(defineProps<{
  albums?: Album[]
}>(), {
  albums: () => []
})
const { isDesktop } = useDevice()
const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

const albums: Ref<Album[]> = ref(props.albums || [])

const favorites: ComputedRef<Album[]> = computed(() => {
  return albums.value?.filter((album) => album.favorite).map((album) => {
    album.url = `/albums/${album.id}`

    return album
  })
})

const featured: ComputedRef<Album|null> = computed(() => {
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
  <div
    v-parallax
    data-rellax-xs-speed="0"
    data-rellax-mobile-speed="0"
    data-rellax-tablet-speed="0"
    data-parallax-speed="-1" data-rellax-percentage="0.5"
    class="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4 g-lg-0 justify-content-center pt-5"
  >
    <div class="col-lg-2">
      <div class="card card-showcase card-sm" data-aos="fade-right" tabindex="-1">
        <div class="cover">
          <nuxt-img v-if="favorites[0]" :src="`${cdnBaseURL}/images/${favorites[0].cover.name}?width=500`" alt="Album's cover" placeholder loading="lazy" />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[0] ? favorites[0].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[0] && favorites[0].url"
          :title="favorites[0].name"
          :to="favorites[0].url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
      <div class="card card-showcase" data-aos="fade-right">
        <div class="cover">
          <nuxt-img v-if="favorites[1]" :src="`${cdnBaseURL}/images/${favorites[1].cover.name}?width=500`" alt="Album's cover" placeholder loading="lazy" />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[1] ? favorites[1].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[1] && favorites[1].url"
          :title="favorites[1].name"
          :to="favorites[1].url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-3">
      <div class="card card-showcase featured tilt" data-aos="zoom-in" data-aos-duration="400">
        <span class="featured-badge">{{ $t('cards.featured') }}</span>

        <div class="cover">
          <nuxt-img v-if="featured" :src="`${cdnBaseURL}/images/${featured.cover.name}?width=500`" alt="Album's cover" placeholder loading="lazy" />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ featured ? featured.name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="featured && featured.url"
          :title="featured.name"
          :to="featured.url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
      <div class="card card-showcase" data-aos="fade-left">
        <div class="cover">
          <nuxt-img v-if="favorites[2]" :src="`${cdnBaseURL}/images/${favorites[2].cover.name}?width=500`" alt="Album's cover" placeholder loading="lazy" />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="card-title album-title">
            {{ favorites[2] ? favorites[2].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[2] && favorites[2].url"
          :title="favorites[2].name"
          :to="favorites[2].url"
          class="stretched-link"
        />
      </div>
    </div>

    <div class="col-lg-2">
      <div class="card card-showcase card-sm" data-aos="fade-left" tabindex="-1">
        <div class="cover">
          <nuxt-img v-if="favorites[3]" :src="`${cdnBaseURL}/images/${favorites[3].cover.name}?width=500`" alt="Album's cover" placeholder loading="lazy" />
          <div class="overlay" />
        </div>

        <div class="card-body">
          <h2 class="album-title">
            {{ favorites[3] ? favorites[3].name : 'X' }}
          </h2>
        </div>

        <NuxtLink
          v-if="favorites[3] && favorites[3].url"
          :title="favorites[3].name"
          :to="favorites[3].url"
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
  box-shadow:
    0 1.4px 3.2px 10px rgba(0, 0, 0, 0.017),
    0 3.1px 7.2px 10px rgba(0, 0, 0, 0.024),
    0 5.4px 12.6px 10px rgba(0, 0, 0, 0.03),
    0 8.6px 20px 10px rgba(0, 0, 0, 0.035),
    0 13.3px 30.9px 10px rgba(0, 0, 0, 0.04),
    0 20.8px 48.2px 10px rgba(0, 0, 0, 0.046),
    0 34.5px 80.1px 10px rgba(0, 0, 0, 0.053),
    0 69px 95px 10px rgba(0, 0, 0, 0.07);
  color: #fff;
  margin: 10px 0 60px;
  position: relative;
  height: 500px;
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
    height: 460px;
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
