import React from 'react';
import { css } from 'react-emotion';

const styles = css({
  maxWidth: 1200,
  margin: '0 auto',
});

const Wrapper: React.SFC = ({ children }) => {
  return (<div className={styles}>{children}</div>);
};

export default Wrapper;
