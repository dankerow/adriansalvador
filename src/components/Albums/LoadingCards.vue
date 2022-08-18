<template>
	<div class="row justify-content-center g-4 mb-6">
		<div v-for="(index) in 30" :key="index" class="col-auto">
			<div class="image-container" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.image-container {
	background: rgb(24, 24, 24);
	height: 320px;
	position: relative;
	width: 225px;
}
</style>
