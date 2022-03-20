export type ImageDataURI = string;

export type RGBColor = { type: "rgb"; value: [number, number, number] };
export type RGBAColor = {
  type: "rgba";
  value: [number, number, number, number];
};
export type HSLColor = { type: "hsl"; value: [number, number, number] };

export type Color = RGBColor | RGBAColor | HSLColor;

export type LinearGradient = {
  type: "linear";
  /* Gradient angle in radians */
  angle: number;
  stops: Array<{ color: Color }>;
  /* Color hint, as percentage */
  hint?: number;
};

export type RadialGradient = {
  type: "radial";
  // TODO: Complete this
};

export type MeshGradient = {
  type: "mesh";
  // TODO: Complete this
};

export type Gradient = LinearGradient; //| RadialGradient | MeshGradient;

/**
 * A variant that only renders a single gradient
 */
export type SimpleGradientVariant = {
  type: "simple-gradient";
  gradient: Gradient;
};

/**
 * A variant that adds up a set of variants
 */
export type AdditiveGradientVariant = {
  type: "additive-gradient";
  gradients: Gradient[];
};

export type PerlinNoiseVariant = {
  type: "perlin-noise";
};

export type Variant =
  | SimpleGradientVariant
  | AdditiveGradientVariant
  | PerlinNoiseVariant;
