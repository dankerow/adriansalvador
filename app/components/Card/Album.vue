<script setup lang="ts">
import type { Album } from '@/types/albums'

defineProps<{
  album: Album | Partial<Album>
}>()

const cdnBaseUrl = useRuntimeConfig().public.cdnBaseUrl

const getCoverUrl = (album: Partial<Album>) => {
  return album.cover ? `${cdnBaseUrl}/covers/${encodeURIComponent(album.cover.name)}` : album.coverFallback ? `${cdnBaseUrl}/s-files/${encodeURIComponent(album.coverFallback.name)}` : ''
}
</script>

<template>
  <div class="album-poster position-relative overflow-hidden rounded">
    <div class="image-container position-relative overflow-hidden rounded">
      <nuxt-img
          v-if="album.cover || album.coverFallback"
          :src="getCoverUrl(album)"
          class="position-absolute"
          width="500"
          height="300"
          fit="cover"
          loading="lazy"
          decoding="async"
          :alt="`${album.name}'s thumbnail`"
      />
    </div>

    <div class="bottom position-absolute bottom-0 start-0 pt-20 px-2 pb-2 text-uppercase w-100">
      <div class="hstack gap-2">
        <div class="text-truncate">
          <h3 class="poster-title mb-0">
            {{ album.name.length > 19 ? `${album.name.substring(0, 20)}...` : album.name }}
          </h3>
        </div>

        <div class="ms-auto">
          <Icon name="ph:arrow-down-right" class="open-new" size="2.5em" />
        </div>
      </div>
    </div>

    <NuxtLink
        :to="`/work/${album._id}`"
        class="stretched-link"
    />
  </div>
</template>

<style lang="scss" scoped>
.album-poster {
  .open-new {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    .open-new {
      opacity: 1;
    }

    .image-container {
      img {
        transform: scale(1.1) translate(-50%, -50%);
      }
    }
  }
}

.poster-title {
  mix-blend-mode: exclusion;
}

.image-container {
  background: rgb(24, 24, 24);
  height: 18.75rem;

  img {
    image-rendering: crisp-edges;
    image-rendering: -webkit-crisp-edges;
    transition: transform .3s ease-in-out;
    top: 50%;
    left: 50%;
    transform: scale(1) translate(-50%, -50%);
  }
}

.bottom {
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
</style>
