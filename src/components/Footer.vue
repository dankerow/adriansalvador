<template>
  <footer class="text-body-secondary">
    <div class="footer-bottom py-3">
      <div class="container">
        <p class="mb-0">
          © {{ new Date().getFullYear() }} Adrian Salvador. Made by
          <a href="https://danmutombo.com" rel="noreferrer" target="_blank">
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
		text-align: center;

		a {
			display: inline-block;
			position: relative;

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
