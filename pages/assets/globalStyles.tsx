import { injectGlobal } from 'react-emotion';
import theme from './theme';

injectGlobal({
  ['*']: {
    margin: 0,
    boxSizing: 'border-box',
    fontFamily: theme.bodyFont,
  },
});
