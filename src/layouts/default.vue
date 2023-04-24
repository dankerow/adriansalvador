<script setup lang="ts">
import type { Directions, LocaleObject } from 'vue-i18n-routing'

const colorMode = useColorMode()
const { locale, locales } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

const description = ref('"Capturing the essence of people through a lens."')

const localeMap = (locales.value as LocaleObject[]).reduce((acc, l) => {
  acc[l.code!] = l.dir ?? 'auto'
  return acc
}, {} as Record<string, Directions>)

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => localeMap[locale.value] ?? 'auto'
  },
  title: null,
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Adrian Salvador | Photographer` : 'Adrian Salvador | Photographer'
  },
  bodyAttrs: {
    class: 'overflow-x-hidden'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: description },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:site',
      content: 'Adrian Salvador | Photographer'
    },
    {
      name: 'twitter:creator',
      content: '@dankerow'
    },
    {
      name: 'twitter:title',
      content: 'salvadoradrian.com'
    },
    {
      name: 'twitter:description',
      content: description
    },
    {
      name: 'twitter:image',
      content: 'https://salvadoradrian.com/icon.png'
    },
    {
      name: 'og:title',
      property: 'og:title',
      content: 'Adrian Salvador | Photographer'
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: description
    },
    {
      name: 'og:image',
      property: 'og:image',
      content: 'https://salvadoradrian.com/icon.png'
    },
    ...(head.value.meta || [])
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://cdn.salvadoradrian.com' },
    { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
    ...(head.value.link || [])
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0-alpha3/js/bootstrap.bundle.min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
})

const route = useRoute()

const isAlbums = computed(() => {
  return route.path.includes('/albums')
})

onMounted(() => {
  const setTheme = function(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  setTheme(colorMode.value)
})
</script>

<template>
  <div>
    <Header />

    <slot />

    <Footer :actions-fixed="!isAlbums" />
  </div>
</template>

<style lang="scss">
.footer-actions {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1));
}

.dark-mode {
  .footer-actions {
    background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 1));
  }
}
</style>
