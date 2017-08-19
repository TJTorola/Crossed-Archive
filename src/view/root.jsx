import { merge } from "ramda"
import React from "react"
import PuzzleComp from "~/view/Puzzle"

const { floor, ceil } = Math

const monthPuzzle = (
  month: sting,
  startIdx: number,
  length: number
): Puzzle => {
  const wallsAndKeys = (i = 0, walls = [], keys = {}) => {
    const x = i % 7
    const y = floor(i / 7)
    const posKey = `${x},${y}`

    if (x === 0 && y * 7 >= startIdx + length) {
      return { walls, keys }
    }

    return i - startIdx < 0 || length <= i - startIdx
      ? wallsAndKeys(i + 1, [...walls, posKey], keys)
      : wallsAndKeys(i + 1, walls, merge(keys, { [posKey]: i - startIdx + 1 }))
  }

  const { walls, keys } = wallsAndKeys()

  return {
    title: month,
    author: "Tyler Torola",
    publisher: "TJT.Codes",
    published: new Date(),
    size: [7, ceil((startIdx + length) / 7)],
    walls,
    keys,
  }
}

const puzzle = monthPuzzle("May", 1, 31)

export default () => <PuzzleComp puzzle={puzzle} />
