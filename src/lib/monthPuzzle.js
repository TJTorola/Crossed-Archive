import { merge } from "ramda"

const { floor, ceil } = Math

const getFirstWeekdayOfMonthIdx = (year: number, month: number): number =>
  new Date(year, month).getDay()

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate()

const monthPuzzle = (year: number, month: number): Puzzle => {
  const firstWeekdayIdx = getFirstWeekdayOfMonthIdx(year, month)
  const daysInMonth = getDaysInMonth(year, month)

  const wallsAndKeys = (i = 0, walls = [], keys = {}) => {
    const x = i % 7
    const y = floor(i / 7)
    const posKey = `${x},${y}`

    if (x === 0 && y * 7 >= firstWeekdayIdx + daysInMonth) {
      return { walls, keys }
    }

    return i - firstWeekdayIdx < 0 || daysInMonth <= i - firstWeekdayIdx
      ? wallsAndKeys(i + 1, [...walls, posKey], keys)
      : wallsAndKeys(
          i + 1,
          walls,
          merge(keys, { [posKey]: i - firstWeekdayIdx + 1 })
        )
  }

  const { walls, keys } = wallsAndKeys()

  return {
    title: `${month}/${year}`,
    author: "Tyler Torola",
    publisher: "TJT.Codes",
    published: new Date(),
    size: [7, ceil((startIdx + length) / 7)],
    walls,
    keys,
  }
}
