<script setup lang="ts">
import { Ref } from 'vue'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/photoswipe.css'

interface Props {
	id: string,
	images: any[],
	ssrColumns?: number,
	columnWidth?: number,
	gap?: number,
}

const props = withDefaults(defineProps<Props>(), {
	ssrColumns: 4,
	columnWidth: 195,
	gap: 15
})

const localePath = useLocalePath()

const imagesData: Ref<any[]> = ref(props.images)
const lightbox: Ref<PhotoSwipeLightbox|null> = ref(null)

onMounted(() => {
	if (!lightbox.value) {
		lightbox.value = new PhotoSwipeLightbox({
			gallery: `#${props.id}`,
			children: '.image-container',
			pswpModule: () => import('photoswipe')
		})

		lightbox.value.on('uiRegister', () => {
			lightbox.value.pswp.ui.registerElement({
				name: 'custom-caption',
				order: 9,
				isButton: false,
				appendTo: 'root',
				html: 'Caption text',
				onInit: (el: HTMLElement) => {
					lightbox.value.pswp.on('change', () => {
						const currSlideElement = lightbox.value.pswp.currSlide.data.element
						let captionHTML = ''

						if (currSlideElement) {
							const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content')
							if (hiddenCaption) {
								captionHTML = hiddenCaption.innerHTML
							} else {
								captionHTML = currSlideElement.querySelector('img').getAttribute('alt')
							}
						}

						el.innerHTML = captionHTML || ''
					})
				}
			})
		})

		lightbox.value.init()
	}
})

onUnmounted(() => {
	if (lightbox) {
		lightbox.value.destroy()
		lightbox.value = null
	}
})

watch(() => props.images, (newImages) => {
	imagesData.value = newImages
})
</script>

<template>
	<masonry-wall
		:id="id"
		:items="imagesData"
		:ssr-columns="ssrColumns"
		:column-width="columnWidth"
		:gap="gap"
	>
		<template #default="{ item }">
			<div class="image-container" :style="`max-height: ${item.thumb.height}px;`">
				<a
					:data-pswp-src="item.url"
					:data-pswp-width="item.metadata.width"
					:data-pswp-height="item.metadata.height"
					type="button"
				>
					<nuxt-img
						class="image-thumbnail"
						:src="`${item.thumb.url}?width=225`"
						:height="item.thumb.height"
						:width="item.thumb.width"
						loading="lazy"
						draggable="false"
						:style="`height: auto; max-width: ${item.thumb.width}px; width: 100%;`"
						alt=""
					/>
				</a>

				<div v-if="item.album" class="hidden-caption-content">
					<NuxtLink :to="localePath(`/albums/${item.album.id}`)" no-prefetch>
						{{ item.album.name }}
					</NuxtLink>
				</div>
			</div>
		</template>
	</masonry-wall>
</template>

<style lang="scss" scoped>
.image-container {
	border-radius: 0.10rem;
	background-color: #141414;
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
