import { Color } from 'src/types'
import { useAppState } from './useAppState'

export type Point = {
  // Position of the point from the top left of the canvas (in percentage)
  position: [number, number]
  color: Color
}

export type MeshGradientConfig = { dimensionX: number; dimensionY: number; points: Point[] }

export function useMeshGradient1(): MeshGradientConfig {
  const { colors } = useAppState()

  return {
    dimensionX: 3,
    dimensionY: 4,
    points: [
      { position: [0, 0], color: colors[0]! },
      { position: [50, 0], color: colors[0]! },
      { position: [100, 0], color: colors[0]! },

      { position: [0, 33.33], color: colors[0]! },
      { position: [80, 33.33], color: colors[1]! },
      { position: [100, 33.33], color: colors[0]! },

      { position: [0, 66.66], color: colors[0]! },
      { position: [20, 66.66], color: colors[1]! },
      { position: [100, 66.66], color: colors[0]! },

      { position: [0, 100], color: colors[0]! },
      { position: [50, 100], color: colors[0]! },
      { position: [100, 100], color: colors[0]! },
    ],
  }
}
