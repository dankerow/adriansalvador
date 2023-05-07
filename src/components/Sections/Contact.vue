<template>
  <section class="contact pt-8 pb-4 pt-lg-10 pb-lg-8 text-center">
    <div class="container">
      <div class="col-lg-7 mx-auto">
        <h1 class="display-6 fw-bold text-body-emphasis">
          Any inquiries or collaborations?
        </h1>
        <p class="fs-3 mb-4">
          {{ $t('contact.description') }}
        </p>

        <div class="d-grid gap-4 d-sm-flex justify-content-sm-center">
          <a href="mailto:me@salvadoradrian.com" aria-label="Email" target="_blank" rel="noreferrer">
            <Icon name="ph:envelope-simple-duotone" size="1.5em" />
          </a>
          <a href="https://www.instagram.com/adriansalvadore/" aria-label="Instagram" target="_blank" rel="noreferrer">
            <Icon name="ph:instagram-logo-duotone" size="1.5em" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.contact {
	background: radial-gradient(ellipse at center, white 0%, #fafafa 100%);
}

.dark-mode {
	.contact {
		background: radial-gradient(ellipse at center, #080808 0%, #101010 100%);
	}
}
</style>
