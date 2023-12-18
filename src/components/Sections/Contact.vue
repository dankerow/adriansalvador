<template>
  <section class="contact pt-8 pb-4 pt-lg-10 pb-lg-8">
    <div class="container">
      <div
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visible: {
            y: 0,
            opacity: 1
          },
          transition: {
            delay: 1500
          }
        }"
        class="card mb-16"
      >
        <div class="card-body pb-4">
          <p class="card-text">
            <span class="first-letter">A</span>
            n aspiring film maker who was born and raised in Saudi Arabia, but originally Filipino, Adrian is a filmmaker, photographer and overall artist open and exploring multiple medias of art. Through his immersion and integration into to different cultures he has been able to have a wider perspective of the world and its beauty. Aiming to explore subjects that evoke deep emotions of love and pain in his art.
          </p>
        </div>

        <div class="card-footer text-body-secondary">
          <Icon name="ph:map-pin-duotone" class="me-2" />
          <span class="text-decoration-underline">Brisbane, Australia</span>
        </div>
      </div>

      <div class="col-lg-7 mx-auto text-center">
        <h3 class="display-6 fw-bold text-body-emphasis">
          Any inquiries or collaborations?
        </h3>

        <p class="fs-3 mb-4">
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
  </section>
</template>

<style lang="scss" scoped>
.contact {
	background: radial-gradient(ellipse at center, white 0%, #fafafa 100%);
}

p {
  .first-letter {
    font-weight: bold;
    font-size: 3.25rem;
    line-height: normal;
  }
}

.dark-mode {
	.contact {
		background: radial-gradient(ellipse at center, #080808 0%, #101010 100%);
	}

  p {
    .first-letter {
      color: #f5f5f5;
    }
  }
}
</style>
