import { Gradient } from '~/types'
import { rgb } from './color'

type SimpleGradientOffsets = {
  pos?: number
  angle?: number
}
export function simpleGradientToCSS(gradient: Gradient, offsets: SimpleGradientOffsets = {}): string {
  const { pos: posOffset = 0, angle: angleOffset = 0 } = offsets

  if (gradient.type === 'linear') {
    const angle = `${gradient.angle + angleOffset}deg`
    const stops = gradient.stops
      .map((s, i) => {
        const pos = s.pos ?? (1 / (gradient.stops.length - 1)) * i * 100
        return `${rgb(s.color)} ${pos + posOffset}%`
      })
      .join(', ')

    return `linear-gradient(${angle}, ${stops})`
  }

  if (gradient.type === 'radial') {
    const stops = gradient.stops.map((s) => `${rgb(s.color)} ${s.pos ? `${s.pos}%` : ''}`).join(', ')

    return `radial-gradient(${stops})`
  }

  return ''
}

export function additiveGradientToCSS(gradients: Gradient[]): string {
  return gradients.map((g) => simpleGradientToCSS(g)).join(', ')
}
