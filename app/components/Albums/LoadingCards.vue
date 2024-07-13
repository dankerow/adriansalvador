<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 justify-content-center g-4 mb-6">
    <div v-for="(index) in 25" :key="index" class="col">
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
	height: 18.75rem;
	position: relative;
}
</style>
