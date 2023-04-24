import Rellax from 'rellax'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('parallax', {
    mounted(el) {
      el.rellax = Rellax(el, {
        round: true
      })
    },
    unmounted(el) {
      el.rellax.destroy()
    }
  })
})
