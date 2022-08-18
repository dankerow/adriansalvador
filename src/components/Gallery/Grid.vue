<template>
	<masonry-wall
		:id="id"
		:items="images"
		:ssr-columns="ssrColumns"
		:column-width="columnWidth"
		:gap="gap"
	>
		<template #default="{ item }">
			<div class="image-container" :style="`max-height: ${item.thumb.height}px;`">
				<a
					:data-pswp-src="item.url"
					:data-pswp-width="item.tags.file['Image Width'].value"
					:data-pswp-height="item.tags.file['Image Height'].value"
					type="button"
				>
					<nuxt-img
						class="image-thumbnail"
						:src="item.thumb.url"
						:height="item.thumb.height"
						:width="item.thumb.width"
						data-aos="fade-up"
						loading="lazy"
						draggable="false"
						:style="`height: auto; max-width: ${item.thumb.width}px; width: 100%;`"
						alt=""
					/>
				</a>

				<div v-if="item.album" class="hidden-caption-content">
					<NuxtLink :to="`/albums/${item.album.id}`" no-prefetch>
						{{ item.album.name }}
					</NuxtLink>
				</div>
			</div>
		</template>
	</masonry-wall>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js'
import 'photoswipe/dist/photoswipe.css'

export default {
	components: {
		MasonryWall: () => import('@yeger/vue2-masonry-wall')
	},
	props: {
		id: {
			type: String,
			required: true
		},
		images: {
			type: Array,
			required: true
		},
		ssrColumns: {
			type: Number,
			default: () => 4
		},
		columnWidth: {
			type: Number,
			default: () => 195
		},
		gap: {
			type: Number,
			default: () => 15
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
				children: '.image-container',
				pswpModule: () => import('photoswipe')
			})

			this.lightbox.on('uiRegister', () => {
				this.lightbox.pswp.ui.registerElement({
					name: 'custom-caption',
					order: 9,
					isButton: false,
					appendTo: 'root',
					html: 'Caption text',
					onInit: (el, pswp) => {
						this.lightbox.pswp.on('change', () => {
							const currSlideElement = this.lightbox.pswp.currSlide.data.element
							let captionHTML = ''
							if (currSlideElement) {
								const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content')
								if (hiddenCaption) {
									// get caption from element with class hidden-caption-content
									captionHTML = hiddenCaption.innerHTML
								} else {
									// get caption from alt attribute
									captionHTML = currSlideElement.querySelector('img').getAttribute('alt')
								}
							}
							el.innerHTML = captionHTML || ''
						})
					}
				})
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
	height: 100%;
	overflow: clip;
	position: relative;
	transition: transform .35s ease-in-out;
	user-select: none;
	width: fit-content;

	&:hover {
		transform: scale(1.02);
	}
}
</style>
