<script setup lang="ts">
withDefaults(defineProps<{
  fixed: boolean
}>(), {
  fixed: false
})

const { $gsap: gsap } = useNuxtApp()

onMounted(() => {
  gsap
    .timeline()
    .fromTo(
      'header',
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        delay: 2.6,
        duration: 1,
        ease: 'back.out(0.2)',
      }
    )
})
</script>

<template>
  <header class="end-0 start-0 top-0 w-100 z-3" :class="{ 'position-sticky': !fixed, 'position-fixed': fixed }">
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <div id="navbarCollapse" class="collapse navbar-collapse text-center">
          <NuxtLink
            class="navbar-brand user-select-none mx-auto"
            to="/"
            aria-label="Navbar Logo"
          >
            <span class="text text-uppercase">[Adrian Salvador]</span>
            <span class="caption text-uppercase">{{ $t('metadata.description') }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  .navbar {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.8);

    .navbar-brand {
      .text {
        display: block;
        font-weight: bold;
        letter-spacing: 1em;
        font-size: calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)));
      }

      .caption {
      display: block;
      font-size: 10px;
      letter-spacing: 0.65em;
      white-space: break-spaces;
      }
    }
  }
}

.dark-mode {
  header {
    .navbar {
      background-color: rgba(14, 14, 14, 0.8);
    }
  }
}
</style>
