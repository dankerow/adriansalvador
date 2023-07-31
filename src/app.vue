<script setup lang="ts">
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()
const { page } = useCounter()

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
</script>

<template>
  <div>
    <NuxtLayout>
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
    </NuxtLayout>
  </div>
</template>
