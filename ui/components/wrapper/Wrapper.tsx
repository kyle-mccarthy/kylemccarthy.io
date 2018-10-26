import React from 'react';
import styled, { css, Themed } from 'react-emotion';

type Variant = 'padded';

const paddedStyles = css({
  padding: '75px 0',
});

const StyledWrapper = styled('div')((props: Themed<Props, any>) => ({
  maxWidth: 1200,
  margin: '0 auto',
}), (props: Props) => {
  if (props.variant === 'padded') {
    return paddedStyles;
  }
  return null;
});

interface Props {
  variant?: Variant;
}

const Wrapper: React.SFC<Props> = ({ children, ...props }) => {
  return (<StyledWrapper {...props}>{children}</StyledWrapper>);
};

export default Wrapper;
