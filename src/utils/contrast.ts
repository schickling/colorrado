import { Color } from '~/types'

export function relativeLuminance(color: Color): number {
  let r: number
  let g: number
  let b: number

  if (color.type === 'rgb') {
    r = color.value[0] / 255
    g = color.value[1] / 255
    b = color.value[2] / 255
  } else {
    throw new Error('relativeLuminance: Not implemeted')
  }

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(c1: Color, c2: Color) {
  let l1 = relativeLuminance(c1)
  let l2 = relativeLuminance(c2)

  if (l1 < l2) {
    let temp = l1
    l1 = l2
    l2 = temp
  }

  return ((l1 + 0.05) / (l2 + 0.05)).toPrecision(2)
}
