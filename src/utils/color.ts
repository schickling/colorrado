import { Color } from 'src/types'

export function hex(color: Color) {
  if (color.type === 'rgb') {
    return `#${color.value.map((c) => c.toString(16).padStart(2, '0')).join('')}`
  }

  throw new Error(`hex: Color type ${color.type} is not implemented`)
}

export function rgb(color: Color) {
  if (color.type === 'rgb') {
    return `rgb(${color.value[0]}, ${color.value[1]}, ${color.value[2]})`
  }

  if (color.type === 'rgba') {
    return `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${color.value[3]})`
  }

  throw new Error(`rgb: Color type ${color.type} is not implemented`)
}
