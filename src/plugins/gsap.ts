import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

export default defineNuxtPlugin(() => {
  if (process.client)
    gsap.registerPlugin(ScrollTrigger, Draggable)
  return {
    provide: { gsap, ScrollTrigger, Draggable },
  }
})
