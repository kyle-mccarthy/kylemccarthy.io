import React from 'react';
import styled, { Themed } from 'react-emotion';

const StyledText = styled('div')((props: Themed<any, any>) => ({
  fontSize: '14px',
  lineHeight: 1.8,
}));

const Text: React.SFC = ({ children }) => {
  return (
    <StyledText>{children}</StyledText>
  );
};

export default Text;
