<template>
	<div class="btn-group dropup-center dropup">
		<button class="btn btn-dark btn-sm" type="button" disabled>
			Language:
		</button>

		<button class="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			{{ $i18n.locales.find(locale => locale.code === $i18n.locale).name }}
		</button>

		<ul :class="`dropdown-menu ${$colorMode.value === 'dark' ? 'dropdown-menu-dark' : '' }`">
			<li
				v-for="locale in availableLocales"
				:key="locale.code"
				@click="changeLocale(locale.code)"
			>
				<span class="dropdown-item">
					{{ locale.name }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		availableLocales() {
			return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
		}
	},
	methods: {
		changeLocale(locale) {
			return this.$i18n.setLocale(locale)
		}
	}
}
</script>

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
