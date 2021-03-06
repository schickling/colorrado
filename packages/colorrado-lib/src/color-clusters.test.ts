import { expect, test } from 'vitest'

import { getMostSimilarColors } from './color-clusters.js'
import type { RGBColor } from './types.js'

test('size 2', () => {
  const colors: RGBColor[] = [
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [3, 3, 3] },
    { type: 'rgb', value: [6, 6, 6] },
    { type: 'rgb', value: [10, 10, 10] },
  ]

  expect(getMostSimilarColors(colors, 2)).toEqual([
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [1, 1, 1] },
  ])

  expect(getMostSimilarColors(colors, 2, 1)).toEqual([
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [3, 3, 3] },
  ])

  expect(getMostSimilarColors(colors, 2, 2)).toEqual([
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [3, 3, 3] },
  ])
})

test('size 2 - different order', () => {
  const colors: RGBColor[] = [
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [3, 3, 3] },
    { type: 'rgb', value: [6, 6, 6] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [10, 10, 10] },
  ]

  const mostSimilarColors = getMostSimilarColors(colors, 2)

  expect(mostSimilarColors).toEqual([
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [0, 0, 0] },
  ])
})

test('size 3', () => {
  const colors: RGBColor[] = [
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [3, 3, 3] },
    { type: 'rgb', value: [6, 6, 6] },
    { type: 'rgb', value: [10, 10, 10] },
  ]

  const mostSimilarColors = getMostSimilarColors(colors, 3)

  expect(mostSimilarColors).toEqual([
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [1, 1, 1] },
    { type: 'rgb', value: [3, 3, 3] },
  ])
})
