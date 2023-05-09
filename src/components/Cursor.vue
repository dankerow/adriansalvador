<script setup lang="ts">
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const colorMode = useColorMode()
const { page } = useCounter()

const actionItemsTags = 'a, button'
const textsTags = 'h1, h2, h3, h4, h5, h6, p, span, li'

const hoveredElement = ref(null)

const focusMouse = (element: HTMLElement, items: NodeListOf<HTMLElement>) => {
  items.forEach((text) => {
    text.addEventListener('pointerenter', () => {
      gsap.to(element, {
        backgroundColor: colorMode.value === 'dark' ? 'rgba(200,200,200,0.25)' : 'rgba(23,23,23,0.25)',
        duration: 1,
        ease: 'power4.out',
      })
    })

    text.addEventListener('pointerleave', () => {
      gsap.to(element, {
        backgroundColor: colorMode.value === 'dark' ? 'rgba(200,200,200,0.45)' : 'rgba(23,23,23,0.45)',
        duration: 1,
        ease: 'power4.out',
      })
    })
  })
}

const scaleMouse = (element, items: NodeListOf<HTMLElement>) => {
  items.forEach((link) => {
    link.addEventListener('pointerenter', () => {
      gsap.to(element, {
        scale: 1.8,
        duration: 1,
        ease: 'power4.out',
      })
    })

    link.addEventListener('pointerleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      })

      hoveredElement.value = null
    })
  })
}

const refreshItems = () => {
  const cursor = document.querySelector('#cursor') as HTMLElement
  const newActionItemsTags = document.querySelectorAll(actionItemsTags) as NodeListOf<HTMLElement>
  const newTexts = document.querySelectorAll(textsTags) as NodeListOf<HTMLElement>

  scaleMouse(cursor, newActionItemsTags)
  focusMouse(cursor, newActionItemsTags)
  focusMouse(cursor, newTexts)
}

onMounted(async () => {
  if (ScrollTrigger.isTouch !== 1) {
    const cursor = document.querySelector('#cursor') as HTMLElement
    cursor.style.backgroundColor = 'transparent'

    const actionItems = document.querySelectorAll(actionItemsTags) as NodeListOf<HTMLElement>
    const texts = document.querySelectorAll(textsTags) as NodeListOf<HTMLElement>

    scaleMouse(cursor, actionItems)
    focusMouse(cursor, actionItems)
    focusMouse(cursor, texts)

    watch(page, (newPage, oldPage) => {
      if (newPage > oldPage) {
        gsap.to(cursor, {
          scale: 1,
          duration: 1,
          ease: 'power4.out',
        })
      }

      refreshItems()
    })

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50
    })

    const xTo = gsap.quickTo(cursor, 'x', {
      duration: 0.4,
      ease: 'back.out(1.7)',
    })

    const yTo = gsap.quickTo(cursor, 'y', {
      duration: 0.4,
      ease: 'back.out(1.7)',
    })

    window.addEventListener('mousemove', (e) => {
      if (cursor.style.backgroundColor === 'transparent') {
        gsap.to(cursor, {
          display: 'flex',
          backgroundColor: colorMode.value === 'dark' ? 'rgba(200,200,200,0.45)' : 'rgba(23,23,23,0.45)',
          duration: 1,
          ease: 'power2.out',
        })
      }

      const tagName = document.elementFromPoint(e.clientX, e.clientY)?.tagName
      hoveredElement.value = tagName?.toLowerCase()

      xTo(e.clientX)
      yTo(e.clientY)
    })
  }
})

onNuxtReady(() => {
  refreshItems()
})
</script>

<template>
  <div
    id="cursor"
    class="border border-white pe-none position-fixed top-0 start-0 rounded-circle align-items-center justify-content-center"
    :style="{ 'display': 'none', 'height': '35px', 'width': '35px', 'z-index': 1500 }"
  >
    <div v-if="hoveredElement" style="font-size: 0.475rem;">
      <span v-if="hoveredElement === 'img'" style="color: white;mix-blend-mode:color-burn;">Preview</span>
    </div>
  </div>
</template>
