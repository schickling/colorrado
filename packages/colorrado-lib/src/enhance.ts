import { getMostSimilarColors } from './color-clusters.js'
import { detectDirtyColors } from './dirty-colors.js'
import { generateColors } from './generate-colors.js'
import type { RGBColor } from './types'

export type EnhanceOptions = {
  filterDirtyColors?: boolean
  clustering?: {
    clusterSize: number
  }
  minimum?: {
    minimumColors?: number
    shouldFail?: boolean
  }
}

export const enhanceColors = (colors: RGBColor[], options: EnhanceOptions = {}): RGBColor[] => {
  const shouldFail = options.minimum?.shouldFail ?? false
  let resultColors = colors.slice()

  try {
    if (options.filterDirtyColors) {
      const { nonDirty } = detectDirtyColors(resultColors)
      resultColors = nonDirty
    }

    if (resultColors.length > 0 && resultColors.length < (options.minimum?.minimumColors ?? 2)) {
      resultColors = generateColors(resultColors, options.minimum?.minimumColors ?? 2)
    }

    if (options.clustering) {
      resultColors = getMostSimilarColors(resultColors, options.clustering.clusterSize)
    }

    if (resultColors.length === 0) {
      throw new Error('Not enough colors detected')
    }

    return resultColors
  } catch (e) {
    console.warn('enhanceColors error', e)

    if (shouldFail) {
      throw e
    } else {
      // Fallback to original colors
      return colors
    }
  }
}
