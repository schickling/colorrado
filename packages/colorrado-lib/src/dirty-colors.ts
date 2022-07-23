import { rgbToHsv } from './color.js'
import type { RGBColor } from './types.js'
import { partition } from './utils.js'

export const detectDirtyColors = (colors: RGBColor[]): { dirty: RGBColor[]; nonDirty: RGBColor[] } => {
  const [dirty, nonDirty] = partition(colors, isDirtyColor)

  return { dirty, nonDirty }
}

export const isDirtyColor = (color: RGBColor): boolean => {
  const [h, s, v] = rgbToHsv(color).value

  const isGreenIsh = isInRange(h, degreeToFloat(70), degreeToFloat(155))
  if (isGreenIsh && v <= 0.4) return true
  if (isGreenIsh && s <= 0.1) return true

  const isYellowish = isInRange(h, degreeToFloat(40), degreeToFloat(70))
  if (isYellowish && v <= 0.7) return true

  const isBrownish = isInRange(h, degreeToFloat(26), degreeToFloat(40))
  if (isBrownish && v <= 0.6) return true
  if (isBrownish && s <= 0.4) return true

  const isOrangeish = isInRange(h, degreeToFloat(16), degreeToFloat(26))
  if (isOrangeish && v <= 0.5) return true
  if (isOrangeish && s <= 0.4) return true

  const isRedish = isInRange(h, degreeToFloat(0), degreeToFloat(16))
  if (isRedish && v <= 0.3) return true
  if (isRedish && s <= 0.2) return true

  const isPurpleish = isInRange(h, degreeToFloat(330), degreeToFloat(360))
  if (isPurpleish && v <= 0.5) return true
  if (isPurpleish && s <= 0.15) return true

  const isTealish = isInRange(h, degreeToFloat(155), degreeToFloat(175))
  if (isTealish && v <= 0.35) return true
  if (isTealish && s <= 0.15) return true

  const isBlueish = isInRange(h, degreeToFloat(175), degreeToFloat(245))
  if (isBlueish && v <= 0.4) return true
  if (isBlueish && s <= 0.15) return true

  if (v <= 0.3) return true

  return false
}

const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

const degreeToFloat = (degree: number): number => degree / 360
