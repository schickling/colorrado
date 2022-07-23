import type { Color, HexColor, HSLColor, HSVColor, RGBColor } from './types.js'

export const hex = (color: Color): string => {
  if (color.type === 'rgb') {
    return `#${color.value.map((c) => c.toString(16).padStart(2, '0')).join('')}`
  }

  if (color.type === 'hex') {
    return `#${color.value}`
  }

  throw new Error(`hex: Color type ${color.type} is not implemented`)
}

export const toRgbString = (color: Color): string => {
  if (color.type === 'rgb') {
    return `rgb(${color.value[0]}, ${color.value[1]}, ${color.value[2]})`
  }

  if (color.type === 'rgba') {
    return `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${color.value[3]})`
  }

  if (color.type === 'hex') {
    return toRgbString(hexToRgb(color))
  }

  throw new Error(`rgb: Color type ${color.type} is not implemented`)
}

export const hexToRgb = (hex: HexColor): RGBColor => {
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.value)
  if (!result) {
    throw new Error(`hexToRgb: Invalid hex color ${hex.value}`)
  }

  return {
    type: 'rgb',
    value: [Number.parseInt(result[1]!, 16), Number.parseInt(result[2]!, 16), Number.parseInt(result[3]!, 16)],
  }
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 */
export const rgbToHsl = (rgb: RGBColor): HSLColor => {
  let [r, g, b] = rgb.value
  ;(r /= 255), (g /= 255), (b /= 255)
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h: number
  let s: number
  const l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        throw new Error(`rgbToHsl: Color type ${rgb.type} is not implemented`)
    }
    h /= 6
  }

  return { type: 'hsl', value: [h, s, l] }
}

export const rgbToHsv = (rgb: RGBColor): HSVColor => {
  const [r, g, b] = rgb.value

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h: number
  const s = max === 0 ? 0 : d / max
  const v = max / 255

  switch (max) {
    case min:
      h = 0
      break
    case r:
      h = g - b + d * (g < b ? 6 : 0)
      h /= 6 * d
      break
    case g:
      h = b - r + d * 2
      h /= 6 * d
      break
    case b:
      h = r - g + d * 4
      h /= 6 * d
      break
    default:
      throw new Error(`rgbToHsv: Color type ${rgb.type} is not implemented`)
  }

  return { type: 'hsv', value: [h, s, v] }
}
