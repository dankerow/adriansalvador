<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

onMounted(() => {
  const loader = document.querySelector(
    '#loader',
  ) as HTMLDivElement

  gsap
    .timeline()
    .to('#blob', {
      attr: {
        d: 'M 0 0 V 70 Q 50 90 100 70 V 0 z',
      },
      duration: 0.3,
      ease: 'power3.in',
      delay: 2,
    })
    .to('#blob', {
      attr: {
        d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      },
      duration: 0.8,
      ease: 'power3',
      onComplete: () => {
        loader.classList.add('d-none')
      },
    })
    .fromTo(
      '#title',
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        duration: 1.4,
        ease: 'power4.out',
      },
      2,
    )
})
</script>

<template>
  <div
    id="loader"
    class="position-fixed vh-100 vw-100 overflow-hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="position-absolute start-0 top-0 h-100 w-100 text-black"
      fill="currentColor"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        id="blob"
        stroke="transparent"
        vector-effect="non-scaling-stroke"
        d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
      />
    </svg>

    <div class="position-relative d-grid z-0 h-100 w-100 text-center" :style="{ placeItems: 'center' }">
      <div class="z-1 overflow-hidden">
        <h2 id="title" class="display-1 fw-bold text-black text-uppercase">
          Adrian Salvador
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
#loader {
    z-index: 4;
}

#title {
    background: linear-gradient(90deg, #000, #fff, #000) no-repeat;
    background-size: 80%;
    animation: animate 3.5s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-stroke: 0.188rem rgba(255, 255, 255, 0);
}

@keyframes animate {
    0% {
        background-position: -500%;
    }
    100% {
        background-position: 500%;
    }
}
</style>
