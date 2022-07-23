import type { Color, HexColor, RGBColor } from 'src/types'

export const hex = (color: Color): string => {
  if (color.type === 'rgb') {
    return `#${color.value.map((c) => c.toString(16).padStart(2, '0')).join('')}`
  }

  if (color.type === 'hex') {
    return `#${color.value}`
  }

  throw new Error(`hex: Color type ${color.type} is not implemented`)
}

export const rgb = (color: Color): string => {
  if (color.type === 'rgb') {
    return `rgb(${color.value[0]}, ${color.value[1]}, ${color.value[2]})`
  }

  if (color.type === 'rgba') {
    return `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${color.value[3]})`
  }

  if (color.type === 'hex') {
    return rgb(hexToRgb(color))
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
