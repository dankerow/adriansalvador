<template>
	<div>
		<h3>Albums</h3>

		<ul class="list-unstyled">
			<li v-for="album in albums.list" :key="album.id">
				<NuxtLink to="to">
					<span class="text">
						{{ album.name }}
					</span>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: mapState(['albums'])
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

		.text {
			font-family: "Favorit SSENSE Inter","Helvetica Neue",Helvetica,Arial,sans-serif;
			font-size: 11px;
			line-height: 1.36;
			letter-spacing: .09px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			color: #000;
		}
	}
}
</style>
