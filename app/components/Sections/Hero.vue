<script setup lang="ts">
const colorMode = useColorMode()

const navLinks = [
  { title: 'home', to: '/' },
  { title: 'my work', to: '/work' },
  { title: 'about', to: '/about' }
]

onMounted(() => {
  const gradient = new Gradient()

  gradient.initGradient('#gradient-canvas-hero')

  watch(() => colorMode.preference, () => {
    gradient.initGradient('#gradient-canvas-hero')
  })
})
</script>

<template>
  <section class="hero min-vh-100 p-4">
    <div class="cover position-relative rounded-4">
      <canvas id="gradient-canvas-hero" data-transition-in />

      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid px-3">
          <NuxtLink
              class="navbar-brand user-select-none mx-auto"
              to="/"
              aria-label="Navbar Logo"
          >
            <span class="text-uppercase">
              Adrian Salvador
            </span>
          </NuxtLink>

          <button
              class="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <Icon
                name="solar:hamburger-menu-line-duotone"
                size="1.8em"
            />
          </button>

          <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav nav-underline text-uppercase ms-auto mb-2 mb-lg-0">
              <li
                  v-for="link in navLinks"
                  :key="link.to"
                  class="nav-item"
              >
                <NuxtLink
                    :to="link.to"
                    class="nav-link"
                    :class="{ active: $route.path === link.to }"
                >
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>

            <div class="vr my-auto mx-3" />

            <ul class="navbar-nav list-unstyled">
              <li class="nav-item">
                <a class="nav-link" href="https://www.instagram.com/adriansalvadore/" rel="noreferrer" target="_blank" aria-label="My Instagram Profile">
                  <Icon name="ph:instagram-logo-duotone" size="1.4em" />
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="https://vimeo.com/user181229489" rel="noreferrer" target="_blank" aria-label="My Vimeo Profile">
                  <Icon name="ph:video-duotone" size="1.4em" />
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

          <p class="lead text-body-secondary fst-italic ms-4 mb-6">
            Capturing the essence of people through a lens.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  .bottom {
    h1 {
      font-size: calc(1rem + 6vw);
    }

    p {
      font-size: calc(1rem + 1vw);
    }
  }
}

.cover {
  overflow: hidden;
  height: 90vh;
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
