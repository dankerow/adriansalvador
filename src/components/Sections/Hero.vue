<script setup lang="ts">
const cdnBaseURL = useRuntimeConfig().public.cdnBaseURL

onMounted(() => {
  const lazyVideos = [].slice.call(document.querySelectorAll('video.lazy') as unknown as HTMLVideoElement[])

  if ('IntersectionObserver' in window) {
    const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach((video) => {
        if (video.isIntersecting) {
          for (const source in video.target.children) {
            const videoSource = video.target.children[source] as HTMLSourceElement;
            if (videoSource.tagName === 'SOURCE') {
              videoSource.src = videoSource.dataset.src
            }
          }

          video.target.load();
          video.target.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach((lazyVideo) => {
      lazyVideoObserver.observe(lazyVideo)
    })
  }
})
</script>

<template>
  <section class="hero">
    <video
      id="background-video"
      class="lazy"
      autoplay
      loop
      muted
      playsinline
      poster="~/assets/images/reflections-poster.jpg"
    >
      <source
        :data-src="`${cdnBaseURL}/videos/reflections.mp4`"
        type="video/mp4"
      >
    </video>
  </section>
</template>

<style lang="scss" scoped>
.hero {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
	height: 100vh;
	mix-blend-mode: luminosity;

	#background-video {
		bottom: auto;
		height: 100%;
		left: 0;
		object-fit: cover;
		position: absolute;
		right: 0;
		width: 100%;
		z-index: -1;
	}
}
</style>
