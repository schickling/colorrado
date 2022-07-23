import { rgbToHsl, rgbToHsv } from './color.js'
import type { RGBColor } from './types.js'
import { partition } from './utils.js'

export const detectDirtyColors = (colors: RGBColor[]): { dirty: RGBColor[]; nonDirty: RGBColor[] } => {
  const [dirty, nonDirty] = partition(colors, isDirtyColor)

  return { dirty, nonDirty }
}

export const isDirtyColor = (color: RGBColor): boolean => {
  const [h, _s, v] = rgbToHsv(color).value

  const isYellowish = isInRange(h, degreeToFloat(40), degreeToFloat(70))
  if (isYellowish && v <= 0.7) return true

  const isBrownish = isInRange(h, degreeToFloat(26), degreeToFloat(32))
  if (isBrownish && v <= 0.6) return true

  const isOrangeish = isInRange(h, degreeToFloat(16), degreeToFloat(26))
  if (isOrangeish && v <= 0.5) return true

  const isRedish = isInRange(h, degreeToFloat(0), degreeToFloat(16))
  if (isRedish && v <= 0.5) return true

  const isPurpleish = isInRange(h, degreeToFloat(330), degreeToFloat(360))
  if (isPurpleish && v <= 0.5) return true

  const isTealish = isInRange(h, degreeToFloat(155), degreeToFloat(175))
  if (isTealish && v <= 0.35) return true

  return v <= 0.3
}

const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

const degreeToFloat = (degree: number): number => degree / 360
