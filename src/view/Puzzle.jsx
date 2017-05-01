// @flow
import React from 'react';
import type { Puzzle } from '~/typedef';
import Box from './Box';

type Props = {
  puzzle: Puzzle,
};

export default () => (
  <svg viewBox="0 0 64 64" width="64" className="puzzle">
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

    <Box
      pos={[0,0]}
      hinted={false}
      error={false}
      color={'foreground'}
      hintNum={1}
      guess={'A'}
    />
  </svg>
);
