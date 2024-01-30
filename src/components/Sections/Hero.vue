<script setup lang="ts">
const colorMode = useColorMode()

onMounted(() => {
  const gradient = new Gradient()

  gradient.initGradient('#gradient-canvas-hero')

  watch(() => colorMode.preference, () => {
    gradient.initGradient('#gradient-canvas-hero')
  })
})
</script>

<template>
  <section class="hero min-vh-100 h-100 position-relative">
    <canvas id="gradient-canvas-hero" data-transition-in />

    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
              <NuxtLink class="nav-link" to="/albums">
                Albums
              </NuxtLink>
            </li>

            <li class="nav-item me-3">
              <a class="nav-link" href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
                <Icon name="ph:instagram-logo-duotone" size="1.5em" />
              </a>
            </li>

            <li class="nav-item me-3">
              <a class="nav-link" href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
                <Icon name="ph:video-duotone" size="1.5em" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="bottom position-absolute bottom-0 start-0 text-uppercase">
        <h1 class="fw-bold lh-1 ms-4">
          Adrian
          Salvador
        </h1>

        <p class="lh-1 ms-4 mb-8">
          "Capturing the essence of people through a lens."
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  &::before {
    background-size: 2rem 2rem;
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 0;
  }

  .bottom {
    h1 {
      font-size: calc(1.5rem + 8vw);
    }

    p {
      font-size: calc(1rem + 1vw);
    }
  }
}

#gradient-canvas-hero {
  --gradient-color-1: #ffffff;
  --gradient-color-2: #dbdbdb;
  --gradient-color-3: #dddddd;
  --gradient-color-4: #e7e7e7;

  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.dark-mode {
  #gradient-canvas-hero {
    --gradient-color-1: #000000;
    --gradient-color-2: #242424;
    --gradient-color-3: #222222;
    --gradient-color-4: #181818;
  }
}
</style>
