export type RGBColor = { type: "rgb"; value: [number, number, number] };
export type HSLColor = { type: "hsl"; value: [number, number, number] };

export type Color = RGBColor; // | HSLColor;

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
};

export type MeshGradient1 = {
  type: "mesh1";
};

export type MeshGradient2 = {
  type: "mesh2";
};

export type Gradient = LinearGradient; //| RadialGradient | MeshGradient1 | MeshGradient2;

export type Variant = {
  gradients: Array<Gradient>;
};
