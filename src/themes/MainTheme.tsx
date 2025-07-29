import { createTheme, ThemeProvider } from '@mui/material/styles';

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const theme = createTheme({
  palette: {
    primary: {
      main: cssVar('--color-orange'),
      light: cssVar('--color-logo-blue-bright'),
      dark: cssVar('--color-logo-blue'),
      contrastText: '#ffffff',
    },
    secondary: {
      main: cssVar('--color-charcoal'),
      light: cssVar('--color-gray-brown'),
      dark: cssVar('--color-dark-gray'),
      contrastText: '#ffffff',
    },
    background: {
      default: cssVar('--color-light-gray'),
      paper: cssVar('--color-input-background'),
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'var(--font-primary)',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      '@media (max-width:1024px)': { fontSize: '40px' },
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
      '@media (max-width:1024px)': { fontSize: '28px' },
    },
    h3: {
      fontSize: '24px',
      fontWeight: 500,
      '@media (max-width:1024px)': { fontSize: '20px' },
    },
    button: {
      fontSize: '24px',
      fontWeight: 500,
      '@media (max-width:1024px)': { fontSize: '20px' },
    },
    body1: {
      fontSize: '20px',
      fontWeight: 400,
      '@media (max-width:1024px)': { fontSize: '16px' },
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      '@media (max-width:1024px)': { fontSize: '14px' },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-primary)',
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '18px',
          transition: 'all 0.3s ease-in-out',
        },
        containedPrimary: {
          backgroundColor: cssVar('--color-orange'),
          color: cssVar('--color-white'),
          '&:hover': {
            backgroundColor: cssVar('--color-logo-blue'),
          },
          '&:disabled': {
            backgroundColor: cssVar('--color-gray-brown'),
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        outlinedPrimary: {
          borderColor: cssVar('--color-orange'),
          color: cssVar('--color-orange'),
          '&:hover': {
            backgroundColor: 'rgba(255, 119, 19, 0.1)',
          },
        },
        textPrimary: {
          color: cssVar('--color-orange'),
          '&:hover': {
            backgroundColor: 'rgba(255, 119, 19, 0.1)',
          },
        },
        containedSecondary: {
          backgroundColor: cssVar('--color-charcoal'),
          color: cssVar('--color-white'),
          '&:hover': {
            backgroundColor: cssVar('--color-dark-gray'),
          },
          '&:disabled': {
            backgroundColor: cssVar('--color-gray-brown'),
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        outlinedSecondary: {
          borderColor: cssVar('--color-charcoal'),
          color: cssVar('--color-charcoal'),
          '&:hover': {
            backgroundColor: 'rgba(115, 126, 134, 0.1)',
          },
        },
        textSecondary: {
          color: cssVar('--color-charcoal'),
          '&:hover': {
            backgroundColor: 'rgba(115, 126, 134, 0.1)',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              backgroundColor: '#ffffff',
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        PaperComponent: props => (
          <div {...props} style={{ backgroundColor: '#ffffff' }} />
        ),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const MainTheme = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MainTheme;
