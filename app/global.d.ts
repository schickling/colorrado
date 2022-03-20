declare module "colorthief" {
  export default class ColorThief {
    constructor();

    getColor(image: HTMLImageElement): [number, number, number];
    getColor(
      image: HTMLImageElement,
      /**
       * An optional argument that must be an Integer of value 1 or greater, and defaults to 10.
       * The number determines how many pixels are skipped before the next one is sampled.
       * We rarely need to sample every single pixel in the image to get good results.
       * The bigger the number, the faster a value will be returned.
       */
      quality?: number
    ): [number, number, number];

    getPalette(image: HTMLImageElement): [number, number, number][];
    getPalette(
      image: HTMLImageElement,
      colorCount?: number
    ): [number, number, number][];
    getPalette(
      image: HTMLImageElement,
      colorCount: number,
      /**
       * An optional argument that must be an Integer of value 1 or greater, and defaults to 10.
       * The number determines how many pixels are skipped before the next one is sampled.
       * We rarely need to sample every single pixel in the image to get good results.
       * The bigger the number, the faster a value will be returned.
       */
      quality?: number
    ): [number, number, number][];
  }
}
