<template>
	<div>
		<LazyHydrate when-visible>
			<Header />
		</LazyHydrate>

		<Nuxt role="main" />

		<LazyHydrate when-visible>
			<Footer />
		</LazyHydrate>
	</div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
	components: {
		LazyHydrate
	}
}
</script>
