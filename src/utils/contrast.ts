import { Color } from '~/types'

export function relativeLuminance(color: Color): number {
  if (color.type === 'rgb') {
    const gammaCorrectedColor = color.value.map(function (c) {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return gammaCorrectedColor[0] * 0.2126 + gammaCorrectedColor[1] * 0.7152 + gammaCorrectedColor[2] * 0.0722
  } else {
    throw new Error('relativeLuminance: Not implemeted')
  }
}

export function contrastRatio(c1: Color, c2: Color) {
  let l1 = relativeLuminance(c1)
  let l2 = relativeLuminance(c2)

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
