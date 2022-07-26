<template>
	<div>
		<SectionsHero />

		<SectionsCamera class="mt-n14" />

		<div class="container-fluid mt-6">
			<div class="row">
				<div class="col">
					<Albums data-aos="fade-right" />
				</div>
				<div class="col-9">
					<GalleryGrid id="gallery-grid" :images="images" />
				</div>
				<div class="col text-end">
					<Social data-aos="fade-left" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			images: []
		}
	},
	async fetch() {
		const data = await fetch('http://localhost:8010/albums/random', {
			headers: {
				accept: 'application/vnd.adriansalvador.json'
			}
		}).then(res => res.json())

		await this.$store.dispatch('albums/fetch')

		this.images = data
	}
}
</script>

<style lang="scss" scoped>
.container-fluid {
	overflow: clip;
	padding-right: 4rem !important;
	padding-left: 4rem !important;
}
</style>
