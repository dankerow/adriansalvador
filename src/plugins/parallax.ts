import Rellax from 'rellax'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('parallax', {
    mounted(el) {
      Rellax(el, {
        round: true,
      });
    },
  });
});
