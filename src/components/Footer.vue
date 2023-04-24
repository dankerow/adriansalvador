<script setup lang="ts">
withDefaults(defineProps<{
  actionsFixed?: boolean
}>(), {
  actionsFixed: false
})
</script>

<template>
  <footer class="text-body-secondary" :class="{ 'd-inline': actionsFixed }">
    <div class="footer-actions py-3" :class="{ 'sticky-bottom': actionsFixed }">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-auto">
            <ThemeSelector />
          </div>
          <div class="col-auto">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom text-center py-3">
      <div class="container">
        <p class="mb-0">
          © {{ new Date().getFullYear() }} Adrian Salvador. Made by
          <a class="d-inline-block position-relative" href="https://danmutombo.com" rel="noreferrer" target="_blank">
            Dan Mutombo
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
	background-color: rgb(245, 245, 245);
	font-size: 0.75em;

	.footer-bottom {
		font-size: 12px;

		a {
			&:before {
				content: "";
				width: 0;
				height: 0.5px;
				background-color: currentColor;
				right: 0;
				left: auto;
				bottom: 0;
				position: absolute;
				transition: width 0.3s linear;
			}

			&:hover {
				&:before {
					width: 100%;
					right: auto;
					left: 0;
				}
			}
		}
	}
}

.dark-mode {
	footer {
		background-color: rgb(20, 20, 20);
	}
}
</style>
