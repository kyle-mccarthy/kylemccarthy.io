import styled, { Themed } from 'react-emotion';

export const StyledNavbar = styled('div')(({ theme }: Themed<any, any>) => ({
  color: theme.white,
  ['& .bm-menu a']: {
    color: '#fff',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'block',
    fontSize: '14px',
    letterSpacing: '0.2px',
  },
  ['& .bm-menu a::first-letter']: {
    fontSize: '130%',
  },
  ['& .bm-item']: {
    marginBottom: '15px',
  },
}));

export const styles = {
  bmBurgerBars: {
    background: 'white',
  },
  bmBurgerButton: {
    position: 'fixed',
    width: '26px',
    height: '20px',
    left: '30px',
    top: '30px',
    },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#23212d',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#23212d',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};
