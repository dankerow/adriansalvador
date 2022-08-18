<template>
	<div>
		<h3>{{ title }}</h3>

		<ul class="list-unstyled">
			<li v-for="(index) in itemCount" :key="index">
				<div class="placeholder-glow">
					<span class="placeholder col-12 placeholder-xs" />
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		itemCount: {
			type: Number,
			default: () => 8
		}
	}
}
</script>

<style lang="scss" scoped>
h3 {
	font-weight: bold;
	font-size: 12px;
	text-transform: uppercase;
}

ul {
	li {
		line-height: 15px;
		margin-bottom: 2px;
	}
}
</style>
