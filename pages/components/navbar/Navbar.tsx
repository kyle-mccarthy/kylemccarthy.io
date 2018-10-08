import Link from 'next/link';
import Radium from 'radium';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { StyledNavbar, styles } from './Navbar.styled';

const Navbar: React.SFC = () => {
  return (
    <StyledNavbar>
      <Menu styles={styles}>
        <span><Link href="#"><a>Home</a></Link></span>
      </Menu>
    </StyledNavbar>
  );
};

export default Navbar;
