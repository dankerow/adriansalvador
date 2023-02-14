<script setup lang="ts">
const colorMode = useColorMode()
const localePath = useLocalePath()
</script>

<template>
	<header>
		<ColorScheme tag="nav">
			<nav class="navbar navbar-expand" :class="{ 'navbar-dark': colorMode.value === 'dark' }">
				<div class="container-fluid">
					<div id="navbarCollapse" class="collapse navbar-collapse text-center">
						<NuxtLink
							class="navbar-brand mx-auto"
							:to="localePath('/')"
							aria-label="Navbar Logo"
							no-prefetch
						>
							<span class="text text-uppercase">[Adrian Salvador]</span>
							<span class="caption text-uppercase">{{ $t('metadata.description') }}</span>
						</NuxtLink>
					</div>
				</div>
			</nav>
		</ColorScheme>
	</header>
</template>

<style lang="scss" scoped>
header {
	left: 0;
	position: sticky;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 9999;

	.navbar {
		background-color: rgb(245, 245, 245);

		.navbar-brand {
			user-select: none;

			.text {
				display: block;
				font-weight: bold;
				letter-spacing: 1em;
				font-size: calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)));
			}

			.caption {
				display: block;
				font-size: 10px;
				letter-spacing: 0.65em;
				white-space: break-spaces;
			}
		}
	}
}

.dark-mode {
	header {
		.navbar {
			background-color: rgb(14, 14, 14);
		}
	}
}
</style>
