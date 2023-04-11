<script setup lang="ts">
import type { Directions } from 'vue-i18n-routing'
import type { LocaleObject } from '#i18n'

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
  title: 'Adrian Salvador',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: description },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'google', content: 'notranslate' },
    { name: 'robots', content: 'noydir,noodp,noarchive,nocache,notranslate,follow,imageindex,index' },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:site',
      content: 'Adrian Salvador'
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
      content: 'Adrian Salvador'
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
      src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0-alpha2/js/bootstrap.bundle.min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
})

onMounted(() => {
  const setTheme = function(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  setTheme(colorMode.value)

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value') as string
          setTheme(theme)
        })
      })
  })
})
</script>

<template>
  <div>
    <Header />

    <slot />

    <div class="footer-actions py-3">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-auto">
            <ThemeSelector />
          </div>
          <div class="col-auto">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>

    <LazyFooter />
  </div>
</template>

<style lang="scss">
.footer-actions {
	background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.6), rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 1));
}
</style>
