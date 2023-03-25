import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }

    if (from.path.includes('/albums') && to.path.includes('/albums')) {
      return { top: 0 }
    }

    return { top: 0 }
  }
}
