import { expect, test } from 'vitest'

import { hexToRgb, toHexString } from './color.js'
import { generateColors } from './generate-colors.js'

test('generate colors red 2', () => {
  const generatedColors = generateColors([hexToRgb({ type: 'hex', value: '#ff0000' })], 2)
  expect(generatedColors.map(toHexString)).toMatchInlineSnapshot(`
    [
      "#ff0000",
      "#ff3333",
    ]
  `)
})

test('generate colors red 3', () => {
  const generatedColors = generateColors([hexToRgb({ type: 'hex', value: '#ff0000' })], 3)
  expect(generatedColors.map(toHexString)).toMatchInlineSnapshot(`
    [
      "#ff0000",
      "#ff4040",
      "#ff3333",
    ]
  `)
})

test('generate colors gray 2', () => {
  const generatedColors = generateColors([hexToRgb({ type: 'hex', value: '#888888' })], 2)
  expect(generatedColors.map(toHexString)).toMatchInlineSnapshot(`
    [
      "#888888",
      "#886d6d",
    ]
  `)
})

test('generate colors gray 3', () => {
  const generatedColors = generateColors([hexToRgb({ type: 'hex', value: '#888888' })], 3)
  expect(generatedColors.map(toHexString)).toMatchInlineSnapshot(`
    [
      "#888888",
      "#887474",
      "#886d6d",
    ]
  `)
})

test('generate colors gray 4', () => {
  const generatedColors = generateColors([hexToRgb({ type: 'hex', value: '#888888' })], 4)
  expect(generatedColors.map(toHexString)).toMatchInlineSnapshot(`
    [
      "#888888",
      "#887171",
      "#886d6d",
      "#886868",
    ]
  `)
})
