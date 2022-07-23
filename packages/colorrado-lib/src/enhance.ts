import { getMostSimilarColors } from './color-clusters.js'
import { detectDirtyColors } from './dirty-colors.js'
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

    if (options.clustering) {
      resultColors = getMostSimilarColors(resultColors, options.clustering.clusterSize)
    }

    if (resultColors.length < (options.minimum?.minimumColors ?? 1)) {
      throw new Error('Not enough colors detected')
    }

    return resultColors
  } catch (e) {
    if (shouldFail) {
      throw e
    } else {
      // Fallback to original colors
      return colors
    }
  }
}
