<script setup lang="ts">
import type { AlbumFile } from '@/types/albums'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/photoswipe.css'

interface Props {
  images: AlbumFile[]
  ssrColumns?: number
  columnWidth?: number
  minColumns?: number
  maxColumns?: number
  gap?: number
  scrollContainer?: HTMLElement | null
}

const props = withDefaults(defineProps<Props>(), {
  columnWidth: 250,
  scrollContainer: null,
  gap: 20
})

const imagesData = computed<AlbumFile[]>(() => props.images)
const lightbox = ref<PhotoSwipeLightbox | null>(null)
const masonry = ref<HTMLElement>()

const getImageDimensions = (image: AlbumFile) => {
  const width = image.metadata.width
  const height = image.metadata.height

  const ratio = width / height

  const columnWidth = props.columnWidth
  const defaultWidthForMobile = 360; // Example default width
  const effectiveClientWidth = masonry.value?.$el.clientWidth > 0 ? masonry.value?.$el.clientWidth : defaultWidthForMobile;

  const columns = Math.floor(effectiveClientWidth / columnWidth)

  const imageWidth = Math.min(effectiveClientWidth / columns, columnWidth)
  const imageHeight = imageWidth / ratio

  return {
    width: +imageWidth.toFixed(2),
    height: +imageHeight.toFixed(2)
  }
}

onMounted(() => {
  if (!lightbox.value && masonry.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: masonry.value.$el,
      children: '.masonry-item',
      pswpModule: () => import('photoswipe'),
      wheelToZoom: true
    })

    lightbox.value?.on('uiRegister', () => {
      lightbox.value?.pswp?.ui?.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        onInit: (el: HTMLElement) => {
          lightbox.value?.pswp.on('change', () => {
            const currSlideElement = lightbox.value?.pswp.currSlide.data.element

            if (currSlideElement) {
              const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content') as HTMLElement
              if (hiddenCaption) {
                el.innerHTML = hiddenCaption.innerHTML
              }
            }
          })
        }
      })
    })

    lightbox.value?.init()
  }
})

onUnmounted(() => {
  if (lightbox.value !== null) {
    lightbox.value?.destroy()
    lightbox.value = null
  }
})
</script>

<template>
  <masonry-wall
    ref="masonry"
    :items="imagesData"
    :column-width="columnWidth"
    :min-columns="minColumns"
    :max-columns="maxColumns"
    :gap="gap"
    :ssr-columns="ssrColumns"
    :scroll-container="scrollContainer"
  >
    <template #default="{ item }">
      <div class="img-container" :style="{ minWidth: `${getImageDimensions(item).width}px`, minHeight: `${getImageDimensions(item).height}px` }">
        <a
          :href="item.url"
          :data-pswp-width="item.metadata.width"
          :data-pswp-height="item.metadata.height"
          rel="noreferrer"
          aria-label="View image"
        >
          <nuxt-img
            format="webp"
            :src="item.url"
            :width="getImageDimensions(item).width"
            :height="getImageDimensions(item).height"
            sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:20vw"
            draggable="false"
            placeholder
            loading="lazy"
            :alt="item.name"
          />
        </a>

        <div v-if="item.album" class="hidden-caption-content">
          <NuxtLink :to="`/work/${item.album._id}`">
            {{ item.album.name }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </masonry-wall>
</template>

<style lang="scss">
.masonry-wall {
  &:hover {
    .masonry-item {
      img {
        &:not(:hover) {
          filter: grayscale(1);
          opacity: 0.5;
        }
      }
    }
  }

  .masonry-item {
    border-radius: 0.15rem;
    background-color: #141414;
    overflow: hidden;
    position: relative;
    user-select: none;

    img {
      image-rendering: crisp-edges;
      transition: transform .3s ease-in-out, filter .3s ease-in-out, opacity .3s ease-in-out;
      width: 100%;
      height: 100%;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
