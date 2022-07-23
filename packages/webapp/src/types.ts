import type { Color } from 'colorrado'

export type { RGBColor, Color, HexColor, HSLColor } from 'colorrado'

export type ImageB64String = string


export type LinearGradient = {
  type: 'linear'
  /* Gradient angle in radians */
  angle: number
  stops: Array<{ color: Color; pos?: number }>
}

export type RadialGradient = {
  type: 'radial'
  stops: Array<{ color: Color }>
  posX?: number
  posY?: number
}

export type MeshGradient = {
  type: 'mesh'
  // TODO: Complete this
}

export type Gradient = LinearGradient | RadialGradient | MeshGradient

/**
 * A variant that only renders a single gradient
 */
export type SimpleGradientVariant = {
  type: 'simple-gradient'
  gradient: Gradient
}

/**
 * A variant that adds up a set of variants
 */
export type AdditiveGradientVariant = {
  type: 'additive-gradient'
  gradients: Gradient[]
}

export type PerlinNoiseVariant = {
  type: 'perlin-noise'
}

export type Variant = SimpleGradientVariant | AdditiveGradientVariant | PerlinNoiseVariant
