<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  poster?: string
  type?: string
}>(), {
  type: 'video/mp4'
})

const videoPlayer = ref<HTMLElement | null>(null)
const video = ref<HTMLMediaElement | null>(null)

const toggleVideoPlayback = () => {
  if (video.value?.paused) {
    video.value.play()
  } else {
    video.value?.pause()
  }
}

onMounted(() => {
  const { stop } = useIntersectionObserver(
    video.value,
    (entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry

        for (const source in target.children) {
          const videoSource = target.children[source] as HTMLSourceElement
          if (videoSource.tagName === 'SOURCE' && videoSource.dataset.src) {
            videoSource.src = videoSource.dataset.src
          }
        }

        target.load()

        if (isIntersecting) { // if video element is in viewport, start playing
          target.play()
          stop()
        }
      })
    }
  )
});
</script>

<template>
  <div ref="videoPlayer" class="video-player position-relative overflow-hidden mt-4 mb-auto mx-auto d-flex flex-column justify-content-center">
    <video
      ref="video"
      class="w-100 h-100 rounded-3 m-auto shadow-md"
      loop
      muted
      controls
      playsinline
      :poster="poster"
      @click="toggleVideoPlayback"
    >
      <source
        :data-src="src"
        :type="type"
      >
    </video>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  width: 75%;
}
</style>
