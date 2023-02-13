<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'

const colorMode = useColorMode()

const colors: Ref<string[]> = ref(['system', 'light', 'dark'])

const availableColors: ComputedRef<string[]> = computed(() => {
	return colors.value.filter((color: string) => color !== colorMode.preference)
})
</script>

<template>
	<div class="btn-group dropup-center dropup">
		<button class="btn btn-sm" :class="{ 'btn-dark': colorMode.value === 'dark' }" type="button" disabled>
			Theme Preference:
		</button>

		<button class="btn btn-sm dropdown-toggle" :class="{ 'btn-dark': colorMode.value === 'dark' }" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			{{ colorMode.preference }}
		</button>

		<ul
			class="dropdown-menu"
			:class="{ 'dropdown-menu-dark': colorMode.value === 'dark' }"
		>
			<li
				v-for="color of availableColors"
				:key="color"
				@click="colorMode.preference = color"
			>
				<span class="dropdown-item text-capitalize">
					{{ color }}
				</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.btn-sm {
	--bs-btn-padding-y: 0;
	--bs-btn-padding-x: 0.25rem;
	--bs-btn-font-size: 0.75rem;
}

.dropdown-toggle {
	&:after {
		margin-left: 0.055em;
		vertical-align: 0.055em;
	}
}

.dropdown-menu {
	z-index: 1021;

	.dropdown-item {
		border-radius: 0.15rem;
		cursor: pointer;
		display: inline-block;
		transition: all 0.3s ease-in-out;

		&:not(:last-child) {
			margin-bottom: 0.25rem;
		}
	}
}
</style>
