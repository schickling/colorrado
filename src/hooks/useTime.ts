import { useEffect, useState } from 'react'
import { useAppState } from './useAppState'

type Time = number

export function useTime(): Time {
  const { animate } = useAppState()
  const [t, setT] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function frame() {
      requestAnimationFrame(() => {
        if (!animate) return
        frame()
      })
    }

    frame()

    // const interval = setInterval(() => {
    //   setT((t) => t + 1)
    // }, 1)
    //
    // return () => clearInterval(interval)
  }, [animate])

  return t
}

type UseOscillateOptions = {
  amplitude?: number
}

export function useOscillate(time: Time, { amplitude = 1 }: UseOscillateOptions = {}) {
  return (Math.sin(time) + 1) * amplitude
}
