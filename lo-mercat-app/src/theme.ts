import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, yellow } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#596B36'
    },
    secondary: {
      main: '#7F8587'
    },
    error: {
      main: '#F44336'
    },
    warning: {
      main: '#CE8B11'
    },
    success: {
      main: '#519C49'
    },
    info: {
      main: '#1E201B'
    },
    background: {
      default: '#F8F8FF'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
