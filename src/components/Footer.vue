<template>
  <footer class="text-body-secondary">
    <div class="footer-bottom text-center py-3">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-auto">
            <p class="mb-0">
              © {{ new Date().getFullYear() }} Adrian Salvador. Made by
              <a class="d-inline-block position-relative" href="https://danmutombo.com" rel="noopener" target="_blank">
                Dan Mutombo
              </a>
            </p>
          </div>

          <div class="col-auto">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
	background-color: rgb(245, 245, 245);
	font-size: 0.75em;

	.footer-bottom {
		font-size: 0.75rem;

		a {
			&:before {
				content: "";
				width: 0;
				height: 0.031rem;
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
		background-color: rgb(11, 11, 11);
	}
}
</style>
