export const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  const left = [] as T[]
  const right = [] as T[]

  for (const item of array) {
    if (predicate(item)) {
      left.push(item)
    } else {
      right.push(item)
    }
  }

  return [left, right]
}
