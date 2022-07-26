import AOS from 'aos'
import 'aos/dist/aos.css'

export default ({ app }) => {
	app.AOS = new AOS.init(
		{
			once: true,
			throttleDelay: 399,
			offset: 80,
			duration: 800
		}
	)
}
