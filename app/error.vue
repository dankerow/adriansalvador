<script setup lang="ts">
const error = useError()

if (import.meta.dev) {
  console.error(error)
}

const reload = async () => {
  try {
    await clearError({ redirect: '/' })
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <NuxtLayout>
    <main v-if="error" class="text-bg-primary vh-100 d-flex justify-content-center align-items-center flex-column">
      <div class="container">
        <div class="text-center">
          <h1 class="display-1">
            {{ error.statusCode === 404 ? 404 : 500 }}
          </h1>
          <h3 class="mt-4">
            {{ error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.' }}
          </h3>
          <p class="my-6">
            Sorry, {{ error.statusCode === 404
              ? "the page you are looking for doesn't exist or as been moved."
              : "you have encountered a problem."
            }}
            <br>
            Let's find a better place for you to go.
          </p>

          <button class="btn btn-sm btn-dark" @click.prevent="reload()">
            Take me home
            <Icon name="ph:house-bold" />
          </button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
