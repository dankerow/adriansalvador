<template>
  <div class="row row-cols-5 justify-content-center g-4 mb-6">
    <div v-for="(index) in 35" :key="index" class="col">
      <div class="image-container">
        <div class="placeholder-glow">
          <span class="placeholder col-12 placeholder-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
	background: rgb(24, 24, 24);
	height: 320px;
	position: relative;
}
</style>
