<script setup lang="ts">
import type { Album } from '@/types/albums'

withDefaults(defineProps<{
  albums?: Album[]
}>(), {
  albums: () => []
})
</script>

<template>
  <section class="showcase min-vh-100 h-100 overflow-x-hidden pt-4 pb-10 py-lg-12">
    <div class="container-fluid mb-12">
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
        class="ms-4"
      >
        <h1 class="display-5 fw-bold lh-1">
          Showcase
        </h1>

        <p class="fs-3 lh-1">
          Here you can find some of my selected work.
        </p>
      </div>
    </div>

    <div class="container-fluid">
      <AlbumsFavorites :albums="albums" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.showcase {
  background-image: radial-gradient(circle at center, white 0%, #fafafa 100%);
}

.dark-mode {
  .showcase {
    background-image: radial-gradient(circle at center, black 0%, #101010 100%);
  }
}
</style>
