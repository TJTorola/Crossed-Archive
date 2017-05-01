import React from 'react';

const BoxSymbol = ({ color }) => (
  <symbol id={`box-${color}`}>
    <path className={ color } d="M1,1L31,1L31,31L1,31" />
  </symbol>
);

const BoxHintSymbol = ({ color }) => (
  <symbol id={`box-hinted-${color}`}>
    <path className={ color } d="M1,1L25,1L31,7L31,31L1,31" />
  </symbol>
);

const BoxErrSymbol = ({ color }) => (
  <symbol id={`box-error-${color}`}>
    <path className="error" d="M1,1L31,1L31,31L1,31" />
    <path className={ color } d="M2,2L30,2L30,30L2,30" />
  </symbol>
);

const BoxHintErrSymbol = ({ color }) => (
  <symbol id={`box-hinted-error-${color}`}>
    <path className="error" d="M1,1L25,1L31,7L31,31L1,31" />
    <path className={ color } d="M2,2L24.5,2L30,7.5L30,30L2,30" />
  </symbol>
);

const BOX_SYMBOLS = [
  BoxSymbol,
  BoxHintSymbol,
  BoxErrSymbol,
  BoxHintErrSymbol,
];

const Symbols = () => {
  const colors = ['foreground', 'focus', 'highlight'];
  return (
    <g>
      {colors.map(color => (
        BOX_SYMBOLS.map((Symbol, idx) => (
          <Symbol color={color} key={`${color}-${idx}`} />
        ))
      ))}
    </g>
  )
}

const Box = ({ pos, hinted, error, color = "foreground", hintNum, guess }) => {
  const [ix, iy] = pos;
  const [x, y] = [ix * 32, iy * 32];

  const href = `#box${hinted ? '-hinted' : ''}${error ? '-error' : ''}-${color}`;

  const hint = hintNum
    ? <text x={x + 3} y={y + 8} fontSize="7">{hintNum}</text>
    : null;

  const letter = guess
    ? <text x={x + 10} y={y + 20} fontSize="14">{guess}</text>
    : null;

  return (
    <g>
      <use href={href} x={x} y={y} width="32" />
      {hint}
      {letter}
    </g>
  );
}

export default () => (
  <svg viewBox="0 0 64 64" width="64" className="puzzle">
    <Symbols />

    <Box pos={[0,0]} color="highlight" hinted error hintNum="5" />
    <Box pos={[0,1]} color="focus" />
    <Box pos={[1,1]} hintNum="3" />
    <Box pos={[1,0]} guess="A" />
  </svg>
);
