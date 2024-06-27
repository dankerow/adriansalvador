<script setup lang="ts">
const navLinks = [
  { title: 'home', to: '/' },
  { title: 'my work', to: '/work' },
  { title: 'about', to: '/about' }
]
</script>

<template>
  <header class="position-fixed end-0 start-0 top-0 w-100 z-3">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <NuxtLink
          class="navbar-brand user-select-none mx-auto"
          to="/"
          aria-label="Navbar Logo"
        >
          <span class="text-uppercase fw-bold">
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
  </header>
</template>

<style lang="scss" scoped>
header {
  .navbar {
    backdrop-filter: blur(0.75rem);
    background-color: rgba(255, 255, 255, 0.8);
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
