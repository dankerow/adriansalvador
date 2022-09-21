<template>
	<div class="btn-group dropup-center dropup">
		<button class="btn btn-dark btn-sm" type="button" disabled>
			Theme Preference:
		</button>

		<button class="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			{{ $colorMode.preference }}
		</button>

		<ul :class="`dropdown-menu ${$colorMode.value === 'dark' ? 'dropdown-menu-dark' : '' }`">
			<li
				v-for="color of availableColors"
				:key="color"
				@click="$colorMode.preference = color"
			>
				<span class="dropdown-item text-capitalize">
					{{ color }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			colors: ['system', 'light', 'dark']
		}
	},
	computed: {
		availableColors() {
			return this.colors.filter(color => color !== this.$colorMode.preference)
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
