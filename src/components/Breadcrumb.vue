<script setup lang="ts">
defineProps<{
  links: {
    name: string
    path?: string
  }[]
}>()
</script>

<template>
  <div class="container my-3">
    <nav aria-label="breadcrumb" data-aos="fade-down">
      <ol class="breadcrumb py-2 px-3 bg-dark-gray rounded-2">
        <li class="breadcrumb-item">
          <NuxtLink class="link-body-emphasis" to="/">
            <Icon name="ph:house-simple-duotone" />
            <span class="visually-hidden">Home</span>
          </NuxtLink>
        </li>
        <template v-for="link in links" :key="link.name">
          <li v-if="link.path" class="breadcrumb-item">
            <NuxtLink class="link-body-emphasis fw-semibold text-decoration-none" :to="link.path">
              {{ link.name }}
            </NuxtLink>
          </li>

          <li v-else class="breadcrumb-item active" aria-current="page">
            {{ link.name }}
          </li>
        </template>
      </ol>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
	border: 1px solid rgba(38, 38, 38, 0.8);
}
</style>
