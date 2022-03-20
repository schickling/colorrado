import { Gradient } from '~/types'
import { rgb } from './color'

export function simpleGradientToCSS(gradient: Gradient): string {
  if (gradient.type === 'linear') {
    const angle = `${gradient.angle}deg`
    const stops = gradient.stops.map((s) => `${rgb(s.color)} ${s.pos ? `${s.pos}%` : ''}`).join(', ')
    const colorHint = gradient.hint ? `${gradient.hint}%` : ''

    return `linear-gradient(${angle}, ${stops} ${colorHint})`
  }

  if (gradient.type === 'radial') {
    const stops = gradient.stops.map((s) => `${rgb(s.color)} ${s.pos ? `${s.pos}%` : ''}`).join(', ')
    const colorHint = gradient.hint ? `${gradient.hint}%` : ''

    return `radial-gradient(${stops} ${colorHint})`
  }

  return ''
}

export function additiveGradientToCSS(gradients: Gradient[]): string {
  return gradients.map((g) => simpleGradientToCSS(g)).join(', ')
}
