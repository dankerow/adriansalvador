<script setup lang="ts">
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

const imagesData = computed<any[]>(() => props.images)
const lightbox = ref<PhotoSwipeLightbox | null>(null)
const masonry = ref<HTMLElement>()

onMounted(() => {
  if (!lightbox.value && masonry.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: masonry.value.$el,
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
      <a
        :href="item.url"
        :data-pswp-width="item.metadata.width"
        :data-pswp-height="item.metadata.height"
        rel="noreferrer"
        aria-label="View image"
      >
        <nuxt-img
          class="w-100"
          format="webp"
          :src="item.url"
          :width="columnWidth + 50 + gap"
          :height="((columnWidth + 50 + gap) / (item.metadata.width / item.metadata.height)).toFixed(0)"
          :sizes="`sm:50vw md:${(columnWidth) + gap}px lg:${(columnWidth) + gap + 100}px xl:${((columnWidth) + gap) + 200}px`"
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
    </template>
  </masonry-wall>
</template>

<style lang="scss">
.masonry-item {
  border-radius: 0.15rem;
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
