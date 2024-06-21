<template>
  <header class="position-fixed end-0 start-0 top-0 w-100 z-3">
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <div id="navbarCollapse" class="collapse navbar-collapse text-center">
          <NuxtLink
            class="navbar-brand user-select-none mx-auto"
            to="/"
            aria-label="Navbar Logo"
          >
            <span class="text d-block text-uppercase fw-bold">
              Adrian Salvador
            </span>
          </NuxtLink>
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

    .navbar-brand {
      .text {
        letter-spacing: 1em;
        font-size: calc(0.625rem + (16 - 10) * ((100vw - 18.75rem) / (1600 - 300)));
      }

      .caption {
        font-size: 0.625rem;
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
