<template>
	<section class="favorites py-10 py-lg-12">
		<div class="container">
			<p class="description mb-12" data-aos="fade-up">
				<span class="first-letter">A</span>n aspiring film maker who was born and raised in Saudi Arabia, but originally Filipino, Adrian is a a filmmaker, photographer and overall artist open and exploring multiple medias of art. Through his immersion and integration into to different cultures he has been able to have a wider perspective of the world and its beauty. Aiming to explore subjects that evoke deep emotions of love and pain in his art.
			</p>

			<div class="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4 g-lg-0 justify-content-center">
				<div class="col-lg-2">
					<div class="card card-sm" data-aos="fade-right" tabindex="-1">
						<div class="cover rap-god">
							<div class="overlay" />
						</div>
						<div class="card-body">
							<NuxtLink to="/albums/4ac306ea-bcec-41b6-b942-1938296a01d6" no-prefetch>
								<h2 class="album-title">
									Rap God
								</h2>
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="col-lg-2">
					<div class="card" data-aos="fade-right">
						<div class="cover katendrew">
							<div class="overlay" />
						</div>
						<div class="card-body">
							<NuxtLink to="/albums/34b7cce4-bb76-4e31-9dd7-3ccde004db6a" no-prefetch>
								<h2 class="album-title">
									Kate 'N Drew
								</h2>
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="card featured tilt" data-aos="zoom-in" data-aos-duration="400">
						<span class="featured-badge">Featured</span>
						<div class="cover french-immersion">
							<div class="overlay" />
						</div>
						<div class="card-body">
							<NuxtLink to="/albums/c10a66f4-4b18-427f-81b5-f6213d38cdc1" no-prefetch>
								<h2 class="album-title">
									French Immersion
								</h2>
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="col-lg-2">
					<div class="card" data-aos="fade-left">
						<div class="cover whenshetxtsyougn">
							<div class="overlay" />
						</div>
						<div class="card-body">
							<NuxtLink to="/albums/ac8ae991-fce0-4b2d-8a0b-a3a6395d6f6d" no-prefetch>
								<h2 class="album-title">
									When She Txts You GN
								</h2>
							</NuxtLink>
						</div>
					</div>
				</div>

				<div class="col-lg-2">
					<div class="card card-sm" data-aos="fade-left" tabindex="-1">
						<div class="cover highonlife">
							<div class="overlay" />
						</div>
						<div class="card-body">
							<NuxtLink to="/albums/56a14f2f-d344-4101-86e9-587369401016" no-prefetch>
								<h2 class="album-title">
									High On Life
								</h2>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import VanillaTilt from 'vanilla-tilt'

export default {
	mounted() {
		if (this.$device.isDesktop) {
			VanillaTilt.init(document.querySelectorAll('.tilt'), {
				reverse: true
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container-fluid {
	--bs-gutter-x: 1rem;
	--bs-gutter-y: 0;
}

.favorites {
	min-height: 100vh;
	overflow-x: clip;

	p {
		font-size: 18px;

		.first-letter {
			font-weight: bold;
			font-size: 58px;
			line-height: normal;
		}

		&:before {
			content: '"';
			font-size: 22px;
			font-weight: bold;
		}

		&:after {
			content: '"';
			font-size: 22px;
			font-weight: bold;
		}
	}

	.card {
		background-color: transparent;
		border: none;
		border-radius: 0.30rem;
		box-shadow:
			0 1.4px 3.2px 10px rgba(0, 0, 0, 0.017),
			0 3.1px 7.2px 10px rgba(0, 0, 0, 0.024),
			0 5.4px 12.6px 10px rgba(0, 0, 0, 0.03),
			0 8.6px 20px 10px rgba(0, 0, 0, 0.035),
			0 13.3px 30.9px 10px rgba(0, 0, 0, 0.04),
			0 20.8px 48.2px 10px rgba(0, 0, 0, 0.046),
			0 34.5px 80.1px 10px rgba(0, 0, 0, 0.053),
			0 69px 95px 10px rgba(0, 0, 0, 0.07);
		color: #fff;
		margin: 10px 0 60px;
		position: relative;
		height: 500px;
		text-align: center;
		z-index: 1;

		&:hover {
			> .cover {
				filter: grayscale(0);
			}

			> .card-body {
				.album-title {
					color: #fff;
					text-shadow: 0 2px 0 #5f5f5f;
				}
			}
		}

		&.featured {
			border-top: 3px solid rgb(27, 27, 27);
			margin: -30px -20px 0;
			height: 100%;
			z-index: 2;

			.featured-badge {
				background-color: rgb(27, 27, 27);
				border-radius: 0.25rem;
				color: #fff;
				display: inline-block;
				position: absolute;
				left: calc(50% - 49px);
				line-height: 1;
				padding: 4px 20px 5px 20px;
				font-size: 12px;
				text-align: center;
				text-transform: uppercase;
				top: -11px;
				user-select: none;
				z-index: 2;
			}
		}

		.cover {
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			border-radius: 0.30rem;
			filter: grayscale(100%);
			height: 100%;
			left: 0;
			overflow: clip;
			position: absolute;
			top: 0;
			transition: filter 300ms linear;
			width: 100%;

			.overlay {
				background-image: linear-gradient(to bottom, rgba(3, 3, 7, 0.3), rgba(4, 4, 12, 0.8));
				bottom: 0;
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
				transition: .08s;
			}

			&.rap-god {
				background-image: url('~assets/images/Untitled_Artwork.jpg');
			}

			&.katendrew {
				background-image: url('~assets/images/Untitled_Artwork 1.jpg');
			}

			&.whenshetxtsyougn {
				background-image: url('~assets/images/Untitled_Artwork 2.jpg');
			}

			&.highonlife {
				background-image: url('~assets/images/Untitled_Artwork 3.jpg');
			}

			&.french-immersion {
				background-image: url('~assets/images/Untitled_Artwork 4.jpg');
			}
		}

		.card-body {
			position: relative;

			.album-title {
				bottom: 0;
				color: #9c9c9c;
				font-size: 20px;
				font-weight: 800;
				left: 0;
				padding: 0 1rem;
				position: absolute;
				right: 0;
				text-transform: uppercase;
				text-shadow: 0 2px 0 #1b1b1b;
				transition: color 300ms ease-in-out, text-shadow 300ms ease-in-out;
				user-select: none;
			}
		}

		&.card-sm {
			margin: 30px -10px 60px;
			height: 460px;
			z-index: 0;

			.card-body {
				.album-title {
					font-size: 16px;
				}
			}
		}
	}
}

@media (max-width: 991.98px) {
	.card {
		margin: unset !important;

		&.featured {
			margin: unset !important;
			height: 500px !important;
		}

		&.card-sm {
			margin: unset !important;
			height: 500px !important;
		}
	}
}

.dark-mode {
	.favorites {
		p {
			.first-letter {
				color: #f5f5f5;
			}
		}

		.card {
			&.featured {
				border-top: 3px solid rgb(70, 70, 70);

				.featured-badge {
					background-color: rgb(37, 37, 37);
					border: 3px solid rgb(77, 77, 77);
				}
			}
		}
	}
}
</style>
