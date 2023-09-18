<script setup lang="ts">
const { $Gradient: Gradient } = useNuxtApp()

onMounted(() => {
  const gradient = new Gradient()

  gradient.initGradient('#gradient-canvas-hero')
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
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/albums">
                Albums
              </NuxtLink>
            </li>

            <li>
              <a class="nav-link" href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
                <Icon name="ph:instagram-logo-duotone" size="1.5em" />
              </a>
            </li>

            <li>
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

        <p class="fs-2 lh-1 ms-4 mb-8">
          "Capturing the essence of people through a lens."
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 40px 40px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(circle, rgb(255, 255, 255, 0.4) 1px, rgba(255, 255, 255, 0) 1px);

    z-index: 0;
  }

  .bottom {
    h1 {
      font-size: 12rem;
    }
  }
}

#gradient-canvas-hero {
  z-index: -1;
  position: absolute;
  width:100%;
  height:100%;
  --gradient-color-1: #000000;
  --gradient-color-2: #202020;
  --gradient-color-3: #181818;
  --gradient-color-4: #141414;
}
</style>
