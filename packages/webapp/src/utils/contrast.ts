import type { Color } from '~/types'

export const relativeLuminance = (color: Color): number => {
  if (color.type === 'rgb') {
    const gammaCorrectedColor = color.value.map((c) => {
      c /= 255
      return c <= 0.039_28 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return gammaCorrectedColor[0]! * 0.2126 + gammaCorrectedColor[1]! * 0.7152 + gammaCorrectedColor[2]! * 0.0722
  } else {
    throw new Error('relativeLuminance: Not implemeted')
  }
}

export const contrastRatio = (c1: Color, c2: Color) => {
  const l1 = relativeLuminance(c1)
  const l2 = relativeLuminance(c2)

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

  return ratio.toFixed(2)
}
