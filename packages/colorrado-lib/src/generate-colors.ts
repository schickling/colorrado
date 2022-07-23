import { hsvToRgb, rgbToHsv } from './color.js'
import type { RGBColor } from './types.js'

export const generateColors = (colors: RGBColor[], total: number): RGBColor[] => {
  if (colors.length >= total) return colors

  const toGenerateCount = total - colors.length

  const referenceColorHsv = rgbToHsv(colors[0]!)

  const saturationDelta = 0.1 / toGenerateCount
  const referenceSaturation = referenceColorHsv.value[1]
  const adjustedReferenceSaturation = clamp(referenceSaturation, 0.2, 0.8)

  // console.log({ referenceSaturation, toGenerateCount, saturationDelta })

  const generatedSaturationValues = Array.from({ length: toGenerateCount + 1 }, (_, i) => {
    // This makes sure that the middle index times delta equals 0
    const offsetIndex = i - Math.floor(toGenerateCount / 2)
    // console.log({ offsetIndex })

    return adjustedReferenceSaturation + offsetIndex * saturationDelta
  })
    .filter((_) => _ !== referenceSaturation)
    .slice(0, toGenerateCount)

  // console.log(generatedSaturationValues)

  return [
    ...colors,
    ...generatedSaturationValues.map((saturation) =>
      hsvToRgb({ type: 'hsv', value: [referenceColorHsv.value[0], saturation, referenceColorHsv.value[2]] }),
    ),
  ]
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}
