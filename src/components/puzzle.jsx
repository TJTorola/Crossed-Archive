import { range } from "lodash"
import React from "react"
import Box from "~/components/box"

type Props = {
  puzzle: Puzzle,
}

export default ({ puzzle }: Props) => {
  const cells = range(puzzle.size[1]).reduce(
    (acc, y) => [...range(puzzle.size[0]).map(x => [x, y]), ...acc],
    []
  )

  const boxes = cells.map(pos => {
    const key = pos.join(",")
    const wall = puzzle.walls.includes(key)
    const hintNum = puzzle.keys[key] || null

    return wall
      ? null
      : <Box
          key={key}
          pos={pos}
          hinted={false}
          error={false}
          color="foreground"
          hintNum={hintNum}
          guess=" "
        />
  })

  const [w, h] = puzzle.size.map(x => x * 32)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} className="puzzle">
      <defs>
        <g id="box">
          <path d="M1,1L31,1L31,31L1,31" />
        </g>

        <g id="box-hinted">
          <path d="M1,1L25,1L31,7L31,31L1,31" />
        </g>

        <g id="box-error">
          <path className="error" d="M1,1L31,1L31,31L1,31" />
          <path d="M2,2L30,2L30,30L2,30" />
        </g>

        <g id="box-hinted-error">
          <path className="error" d="M1,1L25,1L31,7L31,31L1,31" />
          <path d="M2,2L24.5,2L30,7.5L30,30L2,30" />
        </g>
      </defs>

      {boxes}
    </svg>
  )
}
