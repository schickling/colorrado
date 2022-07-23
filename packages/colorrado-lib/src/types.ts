export type RGBColor = { type: 'rgb'; value: [r: number, g: number, b: number] }

export type RGBAColor = {
  type: 'rgba'
  value: [number, number, number, number]
}
export type HSLColor = { type: 'hsl'; value: [h: number, s: number, l: number] }

export type HSVColor = { type: 'hsv'; value: [h: number, s: number, v: number] }

export type HexColor = {
  type: 'hex'
  /** Without leading # */
  value: string
}

export type Color = RGBColor | RGBAColor | HSLColor | HexColor | HSVColor
