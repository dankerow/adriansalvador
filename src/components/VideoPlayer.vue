<script setup lang="ts">
import type { Ref } from 'vue'

withDefaults(defineProps<{
  src: string
  poster?: string
  type?: string
}>(), {
  type: 'video/mp4'
})

const videoPlayer: Ref<HTMLElement|null> = ref(null)
const video: Ref<HTMLMediaElement|null> = ref(null)
const playbackButton: Ref<HTMLButtonElement|null> = ref(null)
const volumeControl: Ref<HTMLInputElement | null> = ref(null)
const seekBar: Ref<HTMLInputElement|null> = ref(null)
const isPaused: Ref<boolean> = ref(true)
const isMuted: Ref<boolean> = ref(true)
const seekHoverBar: Ref<HTMLDivElement|null> = ref(null)
const seekHoverPos = ref(0)

const toggleVideoPlayback = () => {
  if (video.value?.paused) {
    video.value.play()
  } else {
    video.value?.pause()
  }
}

const toggleMute = () => {
  if (!video.value) return

  video.value.muted = !video.value.muted

  isMuted.value = video.value.muted

  if (volumeControl.value) {
    volumeControl.value.value = video.value.volume.toString()
  }
}

const adjustVolume = () => {
  if (video.value && volumeControl.value) {
    video.value.volume = parseFloat(volumeControl.value.value)

    isMuted.value = video.value.volume === 0
  }
}

const updateSeekBarFromVideo = () => {
  if ((video.value && seekBar.value) && video.value.duration > 0) {
    seekBar.value.value = (video.value.currentTime / video.value.duration).toString()
  }
}

const updatePlaybackStatus = () => {
  if (!video.value) return

  isPaused.value = video.value.paused
}

const seekBarClicked = (event: MouseEvent) => {
  if (!video.value || !seekBar.value) return

  const rect = (event.target as HTMLInputElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const clickedValue = x * parseFloat(seekBar.value.max) / rect.width

  video.value!.currentTime = clickedValue * video.value!.duration / parseFloat(seekBar.value.max)
  seekHoverBar.value!.style.visibility = 'hidden'
}

const mouseEnter = () => {
  seekHoverBar.value!.style.visibility = 'visible'
}

const mouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect()
  seekHoverPos.value = event.clientX - rect.left
}

const mouseLeave = () => {
  seekHoverBar.value!.style.visibility = 'hidden'
}

onMounted(() => {
  playbackButton.value?.addEventListener('click', toggleVideoPlayback)
  seekBar.value?.addEventListener('click', seekBarClicked)
  video.value?.addEventListener('timeupdate', updateSeekBarFromVideo)
  video.value?.addEventListener('play', updatePlaybackStatus)
  video.value?.addEventListener('pause', updatePlaybackStatus)

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

  if (video.value && volumeControl.value) {
    volumeControl.value.value = video.value.volume.toString()
  }
});

onUnmounted(() => {
  playbackButton.value?.removeEventListener('click', toggleVideoPlayback)
  seekBar.value?.removeEventListener('click', seekBarClicked)
  video.value?.removeEventListener('timeupdate', updateSeekBarFromVideo)
  video.value?.removeEventListener('play', updatePlaybackStatus)
  video.value?.removeEventListener('pause', updatePlaybackStatus)
})
</script>

<template>
  <div ref="videoPlayer" class="video-player position-relative overflow-hidden m-auto h-auto">
    <video
      ref="video"
      class="rounded-3 m-auto shadow-md"
      style=" width: 100%; height: auto;"
      loop
      muted
      playsinline
      @click="toggleVideoPlayback"
    >
      <source
        :data-src="src"
        :type="type"
      >
    </video>

    <div class="video-controls position-absolute w-100 d-flex align-items-center justify-content-between bottom-0 rounded-bottom-2">
      <button ref="playbackButton" class="playback-button" type="button" aria-label="Playback Action">
        <Icon v-if="isPaused" name="ph:play-duotone" />
        <Icon v-else name="ph:pause-duotone" />
      </button>

      <div class="progress-container" @mouseenter="mouseEnter" @mousemove="mouseMove" @mouseleave="mouseLeave" @click="seekBarClicked">
        <progress ref="seekBar" class="seek-bar" value="0" max="1" />
        <div ref="seekHoverBar" class="seek-hover-bar" :style="{ left: `${seekHoverPos}px` }" />
      </div>

      <div class="volume-container">
        <Icon v-if="isMuted" name="ph:speaker-simple-slash-duotone" @click="toggleMute" />
        <Icon v-else name="ph:speaker-simple-high-duotone" @click="toggleMute" />

        <div class="volume-slider-container">
          <input ref="volumeControl" class="volume-bar" type="range" min="0" max="1" step="0.1" @input="adjustVolume">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  width: 70%;

  &:hover {
    .video-controls {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.video-controls {
  background: rgba(0 ,0 ,0 , 0.7);
  height: 38px;
  opacity: 0;
  padding: 10px;
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
  transform: translateY(100%);
}

.playback-button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
}

.volume-container {
  cursor: pointer;
  margin-left: 10px;
  position: relative;

  &:hover {
    .volume-slider-container {
      visibility: visible;
    }
  }
}

.volume-slider-container {
  cursor: pointer;
  opacity: 0.7;
  position: absolute;
  right: 50%;
  top: -590%;
  visibility: hidden;

  &::-webkit-slider-thumb {
    background-color: rgb(95, 95, 95);
    cursor: pointer;
  }

  &:hover {
    opacity: 1;

    .n-icon {
      opacity: 1;
    }
  }

  .n-icon {
    opacity: 0.5;
  }

  .volume-bar {
    background: #ddd;
    height: 100%;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s ease-in-out;
    transform: rotate(270deg);
    transform-origin: right;
  }
}

.progress-container {
  position: relative;
  width: 100%;
}

.seek-bar {
  height: 15px; // Set a height for the progress bar
  opacity: 0.7;
  width: 100%;

  &:hover {
    opacity: 1;
  }
}

.seek-hover-bar {
  background-color: rgb(135, 135, 135);
  position: absolute;
  height: 14px;
  top: 2px;
  visibility: hidden;
  width: 3px;
  margin-left: 2px;
}
</style>
