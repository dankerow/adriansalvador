<script setup lang="ts">
useHead({
  script: [
    {
      src: '/js/Gradient.min.js',
      defer: true
    }
  ]
})
</script>

<template>
  <div>
    <SectionsHero />

    <section class="about pt-8 pb-4 pt-lg-10 pb-lg-8">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 justify-content-center">
          <div
            v-motion="{
              initial: {
                opacity: 0,
                y: 100
              },
              visible: {
                y: 0,
                opacity: 1
              },
              transition: {
                delay: 1500
              }
            }"
            class="col mb-4 mb-md-0"
          >
            <p class="lead">
              An aspiring film maker who was born and raised in Saudi Arabia, but originally Filipino, Adrian is a filmmaker, photographer and overall artist open and exploring multiple medias of art. Through his immersion and integration into to different cultures he has been able to have a wider perspective of the world and its beauty. Aiming to explore subjects that evoke deep emotions of love and pain in his art.
            </p>
          </div>

          <div
            v-motion="{
              initial: {
                opacity: 0,
                y: 100
              },
              visible: {
                y: 0,
                opacity: 1
              },
              transition: {
                delay: 1500
              }
            }"
            class="col"
          >
            <h3 class="display-6 fw-bold text-body-emphasis">
              Any inquiries or collaborations?
            </h3>

            <p class="lead mb-4">
              Let's get in touch! I'm always eager to chat with you about anything related to my work. Whether you want to ask me something, share your ideas, or hire me for a project, I'm all ears!
            </p>

            <a class="me-2" href="mailto:me@salvadoradrian.com" aria-label="Email" target="_blank" rel="noreferrer">
              <Icon name="ph:envelope-simple-duotone" size="1.5em" />
            </a>

            <a href="https://www.instagram.com/adriansalvadore/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <Icon name="ph:instagram-logo-duotone" size="1.5em" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  background: radial-gradient(ellipse at center, white 0%, #fafafa 100%);
}

.dark-mode {
  .about {
    background: radial-gradient(ellipse at center, #080808 0%, #101010 100%);
  }
}
</style>
