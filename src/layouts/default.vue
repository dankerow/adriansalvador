<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useHead({
  htmlAttrs: {
    lang: () => head.value.htmlAttrs?.lang,
    dir: () => head.value.htmlAttrs?.dir ?? 'auto'
  },
  title: null,
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Adrian Salvador` : 'Adrian Salvador | Photographer'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: () => t('metadata.description') },
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
      content: () => t('metadata.description')
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
      content: () => t('metadata.description')
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
      src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.1/js/bootstrap.bundle.min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
})

const route = useRoute()

const isHome = computed(() => {
  return route.path === '/'
})

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
    <Loader />
    <LazyCursor />

    <Header :fixed="isHome" />

    <slot />

    <Footer :actions-fixed="!isAlbums" />
  </div>
</template>
