import { RGBColor } from '~/types'

export type Distance = number
export type DistanceTable = [ColorIndex, ColorIndex, Distance][]

export const getDistanceTable = (colors: RGBColor[]): DistanceTable => {
  const distances: DistanceTable = []

  for (let color1Index = 0; color1Index < colors.length; color1Index++) {
    for (let color2Index = 0; color2Index < colors.length; color2Index++) {
      if (color1Index !== color2Index) {
        distances.push([color1Index, color2Index, getDistance(colors[color1Index], colors[color2Index])])
      }
    }
  }

  return distances
}

type GrowingTableItem = [distanceSum: Distance, colors: ColorIndex[]]
type GrowingTable = GrowingTableItem[]
/** Array index regarding the `colors` param */
type ColorIndex = number

export const getMostSimilarColors = (colors: RGBColor[], clusterSize: number, resultIndex = 0): RGBColor[] => {
  if (clusterSize > colors.length) {
    throw new Error('getMostSimilarColors: clusterSize must be less than or equal to the number of colors')
  }

  const distanceTable = getDistanceTable(colors)

  // console.table(distanceTable)

  let growingTable: GrowingTable = distanceTable.map(([c1, c2, d]) => [d, [c1, c2]])

  // TODO filter out duplicates [1, 2] === [2, 1]

  for (let k = 2; k < clusterSize; k++) {
    const newGrowingTable: GrowingTable = []

    for (let nextColorIndex = 0; nextColorIndex < colors.length; nextColorIndex++) {
      newGrowingTable.push(
        ...growingTable
          // don't add previously used colors to growing table
          .filter(([_previousDistance, previousColorIndexes]) => !previousColorIndexes.includes(nextColorIndex))
          .map<GrowingTableItem>(([previousDistance, previousColorIndexes]) => {
            const lastColorIndex = previousColorIndexes[previousColorIndexes.length - 1]!
            const additionalDistance = distanceTable.find(
              ([index1, index2]) => index1 === lastColorIndex && index2 === nextColorIndex,
            )![2]

            return [previousDistance + additionalDistance, [...previousColorIndexes, nextColorIndex]]
          }),
      )

      // TODO filter out duplicates [1, 2] === [2, 1]
    }

    // console.log('newGrowingTable')

    // console.table(newGrowingTable)

    growingTable = newGrowingTable
  }

  growingTable.sort(([d1], [d2]) => d1 - d2)

  // console.table(growingTable)

  return growingTable[resultIndex][1].map((index) => colors[index])
}

const colorsAreEqual =
  (c1: RGBColor) =>
  (c2: RGBColor): boolean =>
    c1.value[0] === c2.value[0] && c1.value[1] === c2.value[1] && c1.value[2] === c2.value[2]

const getDistance = (c1: RGBColor, c2: RGBColor): Distance =>
  (Math.abs(c1.value[0] - c2.value[0]) + Math.abs(c1.value[1] - c2.value[1]) + Math.abs(c1.value[2] - c2.value[2])) /
  3 /
  255

// export const getMostSimilarColors = (colors: RGBColor[], clusterSize: number): RGBColor[] => {

// 	if (clusterSize > colors.length) {
// 		throw new Error('getMostSimilarColors: clusterSize must be less than or equal to the number of colors')
// 	}

// 	const distanceTable = getDistanceTable(colors)

// 	distanceTable.sort(([_c1, _c2, d1], [_c3, _c4, d2]) => d1 - d2)

// 	const getMostSimilarColors: RGBColor[] = []
// 	for
// }

// export type DistanceTable = [RGBColor, RGBColor, Distance][]

// export const getDistanceTable = (colors: RGBColor[]): DistanceTable => {
//   const distances: [RGBColor, RGBColor, Distance][] = []

//   for (let color1 of colors) {
//     for (let color2 of colors) {
//       if (color1 !== color2) {
//         distances.push([color1, color2, getDistance(color1, color2)])
//       }
//     }
//   }

//   return distances
// }
