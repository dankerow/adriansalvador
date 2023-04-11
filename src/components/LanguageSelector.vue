<script setup lang="ts">
import type { LocaleObject } from 'vue-i18n-routing'
import type { ComputedRef } from 'vue'

const colorMode = useColorMode()
const { locale, locales, setLocale } = useI18n()

const availableLocales: ComputedRef<LocaleObject[]> = computed(() => {
	return (locales.value as LocaleObject[]).filter(l => l.code !== locale.value)
})
</script>

<template>
	<div class="btn-group dropup-center dropup">
		<ColorScheme>
			<button class="btn btn-sm" :class="{ 'btn-white': colorMode.value === 'light', 'btn-dark': colorMode.value === 'dark' }" type="button" disabled>
				Language:
			</button>

			<button class="btn btn-sm dropdown-toggle" :class="{ 'btn-white': colorMode.value === 'light', 'btn-dark': colorMode.value === 'dark' }" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				{{ locales.find(l => l.code === locale).name }}
			</button>

			<ul :class="`dropdown-menu ${colorMode.value === 'dark' ? 'dropdown-menu-dark' : ''}`">
				<li
					v-for="locale in availableLocales"
					:key="locale.code"
					@click="setLocale(locale.code)"
				>
					<span class="dropdown-item">
						{{ locale.name }}
					</span>
				</li>
			</ul>
		</ColorScheme>
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
