<script setup lang="ts">
import { Album } from '~/types/albums';

const props = withDefaults(defineProps<{
  albums?: Album[]
}>(), {
  albums: () => []
})
</script>

<template>
  <section class="showcase py-10 py-lg-12">
    <div class="container">
      <div class="card mb-12" data-aos="fade-up">
        <div class="card-body pb-4">
          <p class="card-text">
            <span class="first-letter">{{ $t('biography')[0] }}</span>
            {{ $t('biography').substring(1) }}
          </p>
        </div>
        <div class="card-footer text-body-secondary">
          <span>
            <Icon name="ph:map-pin-duotone" class="icon-link me-2" />
            <span class="text-decoration-underline">Brisbane, Australia</span>
          </span>
        </div>
      </div>

      <AlbumsFavorites :albums="albums" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container-fluid {
  --bs-gutter-x: 1rem;
  --bs-gutter-y: 0;
}

.showcase {
  background: radial-gradient(circle at center, white 0%, #ededed 100%);
  min-height: 100vh;
  overflow-x: hidden;

  p {
    .first-letter {
      font-weight: bold;
      font-size: 52px;
      line-height: normal;
    }

    &:before {
      content: '"';
      font-size: 1.375em;
      font-weight: bold;
    }

    &:after {
      content: '"';
      font-size: 1.375em;
      font-weight: bold;
    }
  }
}

.dark-mode {
  .showcase {
    background: radial-gradient(circle at center, black 0%, #101010 100%);

    p {
      .first-letter {
        color: #f5f5f5;
      }
    }
  }
}
</style>
