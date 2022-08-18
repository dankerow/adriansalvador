<template>
	<section class="hero">
		<video id="background-video" autoplay loop muted :poster="require('~/assets/images/reflections-poster.jpg')">
			<source :src="`${$config.cdnBaseURL}/videos/reflections.mp4`" type="video/mp4">
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
