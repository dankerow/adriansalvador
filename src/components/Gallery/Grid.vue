<script setup lang="ts">
import type { Ref } from 'vue'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/photoswipe.css'

interface Props {
  images: any[]
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

const imagesData: Ref<any[]> = ref(props.images)
const lightbox: Ref<PhotoSwipeLightbox|null> = ref(null)

const rootElement = ref<HTMLElement>()

useSafeOnMounted(rootElement, () => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: rootElement.value.$el,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      wheelToZoom: true
    })

    lightbox.value?.on('uiRegister', () => {
      lightbox.value?.pswp.ui.registerElement({
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

watch(() => props.images, (newImages) => {
  imagesData.value = newImages
})
</script>

<template>
  <masonry-wall
    ref="rootElement"
    :items="imagesData"
    :column-width="columnWidth"
    :min-columns="minColumns"
    :max-columns="maxColumns"
    :gap="gap"
    :ssr-columns="ssrColumns"
    :scroll-container="scrollContainer"
  >
    <template #default="{ item }">
      <div class="image-container" :style="{ height: `${((columnWidth + gap) / (item.metadata.width / item.metadata.height)).toFixed(0)}px` }">
        <a
          :href="item.url"
          :data-pswp-width="item.metadata.width"
          :data-pswp-height="item.metadata.height"
          rel="noreferrer"
          aria-label="View image"
        >
          <nuxt-img
            class="img-fluid"
            format="webp"
            :src="item.url"
            :width="columnWidth + gap"
            :height="((columnWidth + gap) / (item.metadata.width / item.metadata.height)).toFixed(0)"
            :sizes="`sm:100vw md:50vw lg:${(columnWidth) + gap}px xl:${((columnWidth) + gap) + 200}px`"
            loading="lazy"
            draggable="false"
            :alt="item.name"
          />
        </a>

        <div v-if="item.album" class="hidden-caption-content">
          <NuxtLink :to="`/albums/${item.album.id}`">
            {{ item.album.name }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </masonry-wall>
</template>

<style lang="scss">
.image-container {
  border-radius: 0.10rem;
  background-color: #141414;
  overflow: hidden;
  position: relative;
  user-select: none;

  img {
    image-rendering: crisp-edges;
    transition: transform .3s ease-in-out;

    &:hover {
     transform: scale(1.05);
    }
	}
}
</style>
