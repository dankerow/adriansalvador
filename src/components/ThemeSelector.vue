<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'

const colorMode = useColorMode()

const themes: Ref<string[]> = ref(['system', 'light', 'dark'])

const availableThemes: ComputedRef<string[]> = computed(() => {
  return themes.value.filter((theme: string) => theme !== colorMode.preference)
})

const setTheme = (theme: string) => {
  document.documentElement.setAttribute('data-bs-theme', colorMode.value === 'dark' ? 'light' : 'dark')
  colorMode.preference = theme
}
</script>

<template>
  <div class="btn-group dropup-center dropup">
    <ColorScheme>
      <button class="btn btn-sm" :class="{ 'btn-white': colorMode.value === 'light', 'btn-dark': colorMode.value === 'dark' }" type="button" disabled>
        Theme Preference:
      </button>

      <button class="btn btn-sm dropdown-toggle" :class="{ 'btn-white': colorMode.value === 'light', 'btn-dark': colorMode.value === 'dark' }" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {{ colorMode.preference }}
      </button>

      <ul class="dropdown-menu">
        <li
          v-for="theme of availableThemes"
          :key="theme"
          @click="setTheme(theme)"
        >
          <span class="dropdown-item text-capitalize">
            {{ theme }}
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
