<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  items?: object[]
  more?: {
    url: string
  }
}>(), {
  items: () => []
})
</script>

<template>
  <div class="list">
    <h3 class="title">
      {{ title }}
    </h3>

    <ul class="list-unstyled">
      <template v-if="!items.length">
        <slot name="items" />
      </template>
      <template v-else>
        <template v-for="item in items" :key="item.id">
          <li>
            <NuxtLink class="text" :to="item.url">
              {{ item.name }}
            </NuxtLink>
          </li>
        </template>
      </template>

      <li v-if="more?.url">
        <NuxtLink class="text" :to="more.url">
          See more...
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
	.title {
		font-size: 12.5px;
		font-weight: bold;
		text-transform: uppercase;
	}

	ul {
		width: auto;

		:slotted(li) {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.text {
				font-family: "Favorit SSENSE Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-size: 12px;
				font-stretch: normal;
				font-style: normal;
				font-weight: normal;
				letter-spacing: .09px;
				line-height: 15px;
				position: relative;
				transition: color 300ms ease-in-out;

				&:before {
					bottom: 0;
					background-color: currentColor;
					content: "";
					height: 0.5px;
					left: auto;
					position: absolute;
					right: 0;
					transition: width 0.2s linear;
					width: 0;
				}

				&:hover {
					&:before {
						left: 0;
						right: auto;
						width: 100%;
					}
				}
			}
		}

		li {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.text {
				font-family: "Favorit SSENSE Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
				font-size: 12px;
				font-stretch: normal;
				font-style: normal;
				font-weight: normal;
				letter-spacing: .09px;
				line-height: 15px;
				position: relative;
				transition: color 300ms ease-in-out;

				&:before {
					bottom: 0;
					background-color: currentColor;
					content: "";
					height: 0.5px;
					left: auto;
					position: absolute;
					right: 0;
					transition: width 0.2s linear;
					width: 0;
				}

				&:hover {
					&:before {
						left: 0;
						right: auto;
						width: 100%;
					}
				}
			}
		}
	}
}
</style>
