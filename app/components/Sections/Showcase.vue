<script setup lang="ts">
import type { Album } from '@/types/albums'

import VanillaTilt from 'vanilla-tilt'

const props = withDefaults(defineProps<{
  albums: {
    featured: Album[]
    favorites: Album[]
  }
}>(), {
  albums: () => ({
    featured: [],
    favorites: []
  })
})
const { isDesktop } = useDevice()
const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const albums = computed<{ featured: Album; favorites: Album[] }>(() => ({
  featured: props.albums.featured[0],
  favorites: props.albums.favorites
}))

const getCover = (album: Album) => {
  return album.cover ?? album.coverFallback
}

const getCoverUrl = (album: Album) => {
  return album.cover ? `${cdnBaseUrl}/covers/${encodeURIComponent(album.cover.name)}` : album.coverFallback ? `${cdnBaseUrl}/s-files/${encodeURIComponent(album.coverFallback.name)}` : ''
}

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
  <section class="showcase min-vh-100 h-100 overflow-x-hidden pt-4 pb-10 py-lg-12">
    <div class="container-fluid mb-12">
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
        class="text-uppercase ms-4"
      >
        <h2 class="display-5 fw-bold lh-1 mb-2">
          Showcase
        </h2>

        <p
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
          class="lead text-body-secondary"
        >
          Here you can find some of my selected work.
        </p>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4 g-lg-0 justify-content-center">
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
            class="card card-showcase card-sm"
            tabindex="-1"
          >
            <div class="cover">
              <nuxt-img
                v-if="albums.favorites[0] && getCover(albums.favorites[0])"
                format="webp"
                :src="getCoverUrl(albums.favorites[0])"
                :width="460"
                :height="(460 / getCover(albums.favorites[0]).metadata.width) * getCover(albums.favorites[0]).metadata.height"
                sizes="xs:30vw sm:30vw md:30vw lg:30vw xl:20vw"
                loading="lazy"
                decoding="async"
                :alt="`${albums.favorites[0].name} album's cover`"
              />

              <div class="overlay" />
            </div>

            <div class="card-body">
              <h2 class="album-title">
                {{ albums.favorites[0] ? albums.favorites[0].name : 'X' }}
              </h2>
            </div>

            <NuxtLink
              v-if="albums.favorites[0] && albums.favorites[0].url"
              :to="albums.favorites[0]?.url"
              :aria-label="`View ${albums.favorites[0].name} album`"
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
                v-if="albums.favorites[1] && getCover(albums.favorites[1])"
                format="webp"
                :src="getCoverUrl(albums.favorites[1])"
                :width="500"
                :height="(500 / getCover(albums.favorites[1]).metadata.width) * getCover(albums.favorites[1]).metadata.height"
                sizes="xs:30vw sm:30vw md:30vw lg:30vw xl:20vw"
                loading="lazy"
                decoding="async"
                :alt="`${albums.favorites[1].name} album's cover`"
              />

              <div class="overlay" />
            </div>

            <div class="card-body">
              <h2 class="album-title">
                {{ albums.favorites[1] ? albums.favorites[1].name : 'X' }}
              </h2>
            </div>

            <NuxtLink
              v-if="albums.favorites[1] && albums.favorites[1].url"
              :to="albums.favorites[1].url"
              :aria-label="`View ${albums.favorites[1].name} album`"
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
                v-if="albums.featured"
                format="webp"
                :src="getCoverUrl(albums.featured)"
                :width="560"
                :height="(560 / getCover(albums.featured).metadata.width) * getCover(albums.featured).metadata.height"
                sizes="xs:30vw sm:30vw md:30vw lg:30vw xl:20vw"
                loading="lazy"
                decoding="async"
                :alt="`${albums.featured.name} album's cover`"
              />

              <div class="overlay" />
            </div>

            <div class="card-body">
              <h2 class="album-title">
                {{ albums.featured ? albums.featured.name : 'X' }}
              </h2>
            </div>

            <NuxtLink
              v-if="albums.featured && albums.featured.url"
              :to="albums.featured?.url"
              :aria-label="`View ${albums.featured.name} album`"
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
                v-if="albums.favorites[2] && getCover(albums.favorites[2])"
                format="webp"
                :src="getCoverUrl(albums.favorites[2])"
                :width="500"
                :height="(500 / getCover(albums.favorites[2]).metadata.width) * getCover(albums.favorites[2]).metadata.height"
                sizes="xs:30vw sm:30vw md:30vw lg:30vw xl:20vw"
                alt="Album's cover"
                loading="lazy"
              />

              <div class="overlay" />
            </div>

            <div class="card-body">
              <h2 class="card-title album-title">
                {{ albums.favorites[2] ? albums.favorites[2].name : 'X' }}
              </h2>
            </div>

            <NuxtLink
              v-if="albums.favorites[2] && albums.favorites[2].url"
              :to="albums.favorites[2]?.url"
              :aria-label="`View ${albums.favorites[2].name} album`"
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
                v-if="albums.favorites[3] && getCover(albums.favorites[3])"
                format="webp"
                :src="getCoverUrl(albums.favorites[3])"
                :width="460"
                :height="(460 / getCover(albums.favorites[3]).metadata.width) * getCover(albums.favorites[3]).metadata.height"
                sizes="xs:30vw sm:30vw md:30vw lg:30vw xl:20vw"
                loading="lazy"
                decoding="async"
                :alt="`${albums.favorites[3].name} album's cover`"
              />

              <div class="overlay" />
            </div>

            <div class="card-body">
              <h2 class="album-title">
                {{ albums.favorites[3] ? albums.favorites[3].name : 'X' }}
              </h2>
            </div>

            <NuxtLink
              v-if="albums.favorites[3] && albums.favorites[3].url"
              :to="albums.favorites[3]?.url"
              :aria-label="`View ${albums.favorites[3].name} album`"
              class="stretched-link"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.showcase {
  background-image: radial-gradient(circle at center, white 0%, #fafafa 100%);
}

.card-showcase {
  background-color: rgb(14, 14, 14);
  border: none;
  border-radius: 0.30rem;
  color: #fff;
  height: calc(31.25rem + 10vw);
  margin: 0.625rem 0 3.75rem;
  position: relative;
  text-align: center;
  z-index: 1;

  &:hover {
    > .cover {
      filter: grayscale(0);
    }

    > .card-body {
      .album-title {
        color: #fff;
        text-shadow: 0 0.125rem 0 #5f5f5f;
      }
    }
  }

  &.featured {
    border-top: 0.188rem solid rgb(27, 27, 27);
    height: 100%;
    margin: -1.875rem -1.25rem 0;
    z-index: 2;

    .featured-badge {
      background-color: rgb(27, 27, 27);
      border-radius: 0.25rem;
      color: #fff;
      display: inline-block;
      position: absolute;
      left: calc(50% - 3.125rem);
      line-height: 1;
      padding: 0.25rem 1.25rem 0.313rem 1.25rem;
      font-size: 0.75rem;
      text-align: center;
      text-transform: uppercase;
      top: -0.625rem;
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
      font-size: 1.25rem;
      font-weight: 800;
      left: 0;
      padding: 0 1rem;
      position: absolute;
      right: 0;
      text-transform: uppercase;
      text-shadow: 0 0.125rem 0 #1b1b1b;
      transition: color 300ms ease-in-out, text-shadow 300ms ease-in-out;
      user-select: none;
    }
  }

  &.card-sm {
    margin: 1.825rem -0.625rem 3.75rem;
    height: calc(28.75rem + 10vw);
    z-index: 0;

    .card-body {
      .album-title {
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: 991.98px) {
  .card-showcase {
    margin: unset !important;

    &.featured {
      margin: unset !important;
      height: 31.25rem !important;
    }

    &.card-sm {
      margin: unset !important;
      height: 31.25rem !important;
    }
  }
}

.dark-mode {
  .showcase {
    background-image: radial-gradient(circle at center, black 0%, #101010 100%);
  }

  .card-showcase {
    &.featured {
      border-top: 0.188rem solid rgb(70, 70, 70);

      .featured-badge {
        background-color: rgb(37, 37, 37);
        border: 0.188rem solid rgb(77, 77, 77);
      }
    }
  }
}
</style>
