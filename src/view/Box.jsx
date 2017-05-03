import React from 'react';
import type { Guess } from '~/typedef';

type Props = {
  pos: [number, number],
  hinted: boolean,
  error: boolean,
  color: 'foreground' | 'highlight' | 'focus',
  hintNum: number | null,
  guess: Guess,
}

export default ({ pos, hinted, error, color, hintNum, guess }: Props) => {
  const [x, y] = pos.map(x => x * 32);

  const fill = {
    focus      : '#6D98BA',
    highlight  : '#A7C6DF',
    foreground : '#FDFFFC',
  }[color];

  const href = `#box${ hinted ? '-hinted' : '' }${ error ? '-error' : '' }`;

  const letter = <text x={x + 16} y={y + 22} fontSize="16" textAnchor="middle">{guess}</text>;
  const hint = hintNum
    ? <text x={x + 3} y={y + 10} fontSize="9">{hintNum}</text>
    : null;

  return (
    <g>
      <use href={href} x={x} y={y} width="32" fill={fill} />
      {hint}
      {letter}
    </g>
  );
}
