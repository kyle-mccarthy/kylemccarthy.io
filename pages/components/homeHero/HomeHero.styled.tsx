// import bg from '@src/assets/patterns/light/subtle_grunge.png';
import bg from '@src/assets/patterns/dark/ep_naturalblack.png';
import styled, { Themed } from 'react-emotion';

export const StyledHomeHero = styled('div')({
  background: `url(${bg}) repeat`,
  display: 'flex',
  height: '100%',
  maxHeight: '100vh',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const StyledContent = styled('div')({
  width: '100%',
  maxWidth: 600,
});

export const StyledTitle = styled('h1')(({ theme, ...props }: Themed<any, any>) => ({
  fontSize: '45px',
  fontFamily: theme.titleFont,
  fontWeight: 200,
  textTransform: 'uppercase',
  letterSpacing: '10px',
  color: theme.white,
  ['& > span']: {
    fontSize: '85%',
  },
}));
