import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export default (element: Ref<HTMLElement>, listener: () => void, checkTimeLimit = 100) => {
  if (process.client) {
    let timeId = 0
    const checkInterval = 100
    let checksLeft = checkTimeLimit / checkInterval

    const check = () => {
      if (element.value) {
        listener()
      } else {
        if (checksLeft > 0) {
          timeId = setTimeout(check, checkInterval)
          checksLeft--
        } else {
          console.warn(`pass ${checkTimeLimit}ms, the element not ready! Please check.`)
        }
      }
    };

    onMounted(() => {
      check()
    })

    onUnmounted(() => {
      clearTimeout(timeId)
    })
  }
}
