import React from 'react';
import styled, { Themed } from 'react-emotion';

// tslint:disable:max-line-length

const StyledSVG = styled('svg')(({ theme }: Themed<Props, any>) => ({
  ['& path']: {
    fill: theme.white,
  },
}));

interface Props {
  color?: string;
}

const Logo: React.SFC<Props> = (props) => (
  <StyledSVG viewBox="0 0 319.39 200" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M63.52 37.36L85.97 32 65.85 46.7l2.34 11.68 28.02 11.67L88.97 54l17-28-9.76 25.37 14.01 25.69 16.34-16.35-11.67 25.69 42.03 67.72 42.03-67.72-11.67-25.69 16.34 16.35 14.01-25.69L209.97 24l15 30-7.34 16.05 28.03-11.67 2.33-11.68L229.97 31l20.36 6.36L264.34 0l-14.01 67.72L210.97 79l-54.05 96.13L101.97 78 63.52 67.72 49.5 0l14.02 37.36z"
        />
        <path
          d="M151 135.14l3.63 5.83h6.09l3.61-5.83zm29.36 5.86h32.72l-17.62-26.92-2.94-4.46-1.61-2.46-4.09 7.27 1.61 2.48 2.92 4.52 8.92 13.74h-16.64zm-57.08-34.09l4.29 6.93 1.69-2.6L132 107l25-38.6 24.91 38.41 4.29-6.88L157 55.41l-29.32 44.74-2.68 4.13zM101 141h46.79l-3.62-5.83h-30.41l8.88-13.7-4.1-7.3zm48.44-5.83L153 141h16.34l3.61-5.83z"
        />
      </g>
    </g>
  </StyledSVG>
);

export default Logo;
