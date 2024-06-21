<script setup lang="ts">
useHead({
  title: null,
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Adrian Salvador` : 'Adrian Salvador | Photographer'
  },
  meta: [
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
      content: 'Capturing the essence of people through a lens.'
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
      content: 'Capturing the essence of people through a lens.'
    },
    {
      name: 'og:image',
      property: 'og:image',
      content: 'https://salvadoradrian.com/icon.png'
    }
  ]
})

useScriptNpm({
  packageName: 'bootstrap',
  file: 'dist/js/bootstrap.min.js',
  version: '5.3.3',
  scriptOptions: {
    bundle: true
  }
})

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
const { page } = useCounter()
const colorMode = useColorMode()
const route = useRoute()

const hidden = ref(true)

const onEnter = (el, done) => {
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
      },
    })
    .to('#quadbz', {
      attr: {
        d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
      },
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        page.value++
      }
    })
    .to('#quadbz', {
      attr: {
        d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      },
      duration: 0.5,
      ease: 'power3',
      onComplete: () => {
        hidden.value = true
        done()
      }
    })
}

const onAfterEnter = () => {
  ScrollTrigger.refresh()
}

const onBeforeLeave = () => {
  ScrollTrigger.killAll()
}

const onLeave = (el, done) => {
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
      }
    })
    .to('#quadbz', {
      attr: {
        d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
      },
      duration: 0.5,
      ease: 'power3.in',
      onStart: () => {
        hidden.value = false
      }
    })
    .to('#quadbz', {
      attr: {
        d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
      },
      duration: 0.3,
      ease: 'power3',
      onComplete: () => {
        done()
      }
    })
}

const isHome = computed(() => {
  return route.path === '/'
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
    <NuxtPwaAssets />

    <Loader />
    <LazyCursor />

    <Header v-show="!isHome" />

    <svg
      id="transition"
      xmlns="http://www.w3.org/2000/svg"
      class="position-fixed start-0 top-0 vh-100 vw-100 text-black z-3"
      :class="{ 'd-none': hidden }"
      fill="currentColor"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        id="quadbz"
        stroke="transparent"
        vector-effect="non-scaling-stroke"
        d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
      />
    </svg>

    <div>
      <NuxtPage
        :transition="{
          mode: 'out-in',
          css: false,
          onEnter,
          onAfterEnter,
          onBeforeLeave,
          onLeave
        }"
      />
    </div>

    <Footer />
  </div>
</template>
