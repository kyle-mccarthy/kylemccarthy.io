import Logo from '@src/assets/Logo';
import Wrapper from '@src/components/wrapper/Wrapper';
import React from 'react';
import { StyledContent, StyledHomeHero, StyledTitle } from './HomeHero.styled';

const HomeHero: React.SFC = () => {
  return (
    <StyledHomeHero>
      <StyledContent>
        <Logo />
      </StyledContent>
      <StyledTitle>K<span>yle</span> M<span>cCarthy</span></StyledTitle>
    </StyledHomeHero>
  );
};

export default HomeHero;
