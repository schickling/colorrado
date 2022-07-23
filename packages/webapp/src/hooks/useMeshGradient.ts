import { Color } from 'src/types'
import { useAppState } from './useAppState'

export type Point = {
  // Position of the point from the top left of the canvas (in percentage)
  position: [number, number]
  color: Color
}

export type MeshGradientConfig = { dimensionX: number; dimensionY: number; points: Point[] }

export function useMeshGradient1(): MeshGradientConfig {
  const { colors, enhance, enhancedColors } = useAppState()
  const colorsToUse = enhance ? enhancedColors : colors

  return {
    dimensionX: 3,
    dimensionY: 4,
    points: [
      { position: [0, 0], color: colorsToUse[0]! },
      { position: [50, 0], color: colorsToUse[0]! },
      { position: [100, 0], color: colorsToUse[0]! },

      { position: [0, 33.33], color: colorsToUse[0]! },
      { position: [60, 33.33], color: colorsToUse[1]! },
      { position: [100, 33.33], color: colorsToUse[0]! },

      { position: [0, 66.66], color: colorsToUse[0]! },
      { position: [40, 66.66], color: colorsToUse[1]! },
      { position: [100, 66.66], color: colorsToUse[0]! },

      { position: [0, 100], color: colorsToUse[0]! },
      { position: [50, 100], color: colorsToUse[0]! },
      { position: [100, 100], color: colorsToUse[0]! },
    ],
  }
}

export function useMeshGradient2(): MeshGradientConfig {
  const { colors, enhance, enhancedColors } = useAppState()
  const colorsToUse = enhance ? enhancedColors : colors

  return {
    dimensionX: 4,
    dimensionY: 4,
    points: [
      { position: [0, 0], color: colorsToUse[0]! },
      { position: [33.33, 0], color: colorsToUse[1]! },
      { position: [66.66, 0], color: colorsToUse[1]! },
      { position: [100, 0], color: colorsToUse[0]! },

      { position: [0, 33.33], color: colorsToUse[1]! },
      { position: [66.66, 33.33], color: colorsToUse[0]! },
      { position: [66.66, 66.66], color: colorsToUse[0]! },
      { position: [100, 33.33], color: colorsToUse[0]! },

      { position: [0, 66.66], color: colorsToUse[0]! },
      { position: [33.33, 33.33], color: colorsToUse[0]! },
      { position: [33.33, 66.66], color: colorsToUse[2]! },
      { position: [100, 66.66], color: colorsToUse[0]! },

      { position: [0, 100], color: colorsToUse[0]! },
      { position: [33.33, 100], color: colorsToUse[0]! },
      { position: [66.66, 100], color: colorsToUse[0]! },
      { position: [100, 100], color: colorsToUse[1]! },
    ],
  }
}

export function useMeshGradient3(): MeshGradientConfig {
  const { colors, enhance, enhancedColors } = useAppState()
  const colorsToUse = enhance ? enhancedColors : colors

  return {
    dimensionX: 4,
    dimensionY: 4,
    points: [
      { position: [0, 0], color: colorsToUse[0]! },
      { position: [33.33, 0], color: colorsToUse[1]! },
      { position: [66.66, 0], color: colorsToUse[3]! },
      { position: [100, 0], color: colorsToUse[2]! },

      { position: [0, 33.33], color: colorsToUse[1]! },
      { position: [45, 20], color: colorsToUse[2]! },
      { position: [66.66, 25], color: colorsToUse[0]! },
      { position: [100, 33.33], color: colorsToUse[0]! },

      { position: [0, 66.66], color: colorsToUse[3]! },
      { position: [15, 70], color: colorsToUse[1]! },
      { position: [45, 40], color: colorsToUse[2]! },
      { position: [100, 66.66], color: colorsToUse[0]! },

      { position: [0, 100], color: colorsToUse[1]! },
      { position: [33.33, 100], color: colorsToUse[0]! },
      { position: [66.66, 100], color: colorsToUse[2]! },
      { position: [100, 100], color: colorsToUse[1]! },
    ],
  }
}

export function useMeshGradient4(): MeshGradientConfig {
  const { colors, enhance, enhancedColors } = useAppState()
  const colorsToUse = enhance ? enhancedColors : colors

  return {
    dimensionX: 4,
    dimensionY: 4,
    points: [
      { position: [0, 0], color: colorsToUse[0]! },
      { position: [33.33, 0], color: colorsToUse[0]! },
      { position: [66.66, 0], color: colorsToUse[1]! },
      { position: [100, 0], color: colorsToUse[1]! },

      { position: [0, 33.33], color: colorsToUse[0]! },
      { position: [20, 20], color: colorsToUse[1]! },
      { position: [20, 80], color: colorsToUse[0]! },
      { position: [100, 33.33], color: colorsToUse[0]! },

      { position: [0, 66.66], color: colorsToUse[0]! },
      { position: [20, 80], color: colorsToUse[0]! },
      { position: [80, 80], color: colorsToUse[0]! },
      { position: [100, 66.66], color: colorsToUse[0]! },

      { position: [0, 100], color: colorsToUse[0]! },
      { position: [33.33, 100], color: colorsToUse[0]! },
      { position: [66.66, 100], color: colorsToUse[0]! },
      { position: [100, 100], color: colorsToUse[0]! },
    ],
  }
}
