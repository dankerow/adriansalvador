<template>
	<masonry-wall
		:id="id"
		:items="images"
		:ssr-columns="4"
		:column-width="225"
		:gap="20"
		class="mb-6"
	>
		<template #default="{ item }">
			<div class="col-auto">
				<div class="image-container">
					<a
						class="lightbox"
						:data-pswp-src="item.url"
						:data-pswp-width="item.tags.file['Image Width'].value"
						:data-pswp-height="item.tags.file['Image Height'].value"
						type="button"
					>
						<img
							class="image-thumbnail"
							:src="item.thumb"
							alt=""
							data-aos="fade-up"
							loading="lazy"
							draggable="false"
						>
					</a>
				</div>
			</div>
		</template>
	</masonry-wall>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js'
import 'photoswipe/dist/photoswipe.css'

export default {
	props: {
		id: {
			type: String,
			required: true
		},
		images: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			lightbox: null
		}
	},
	mounted() {
		if (!this.lightbox) {
			this.lightbox = new PhotoSwipeLightbox({
				gallery: `#${this.id}`,
				children: '.lightbox',
				pswpModule: () => import('photoswipe')
			})

			this.lightbox.init()
		}
	},
	unmounted() {
		if (this.lightbox) {
			this.lightbox.destroy()
			this.lightbox = null
		}
	}
}
</script>

<style lang="scss" scoped>
.image-container {
	border-radius: 0.10rem;
	height: auto;
	overflow: clip;
	position: relative;
	user-select: none;
	width: 100%;

	.image-thumbnail {
		transition: all .35s ease-in-out;
	}
}
</style>
