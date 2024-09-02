import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import CustomAdminRoutes from './components/admin/CustomAdminRoutes';
import ErrorEl from './Error';
import { MainContainer } from './MainContainer';
import { MainWithRedirect } from './pages/Main';
export const dateFormat = 'YYYY-MM-DDTHH:mm';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface PaletteColor {
    font?: string;
  }

  interface SimplePaletteColorOptions {
    font?: string;
  }

  interface Palette {
    mainBackground?: Palette['primary'];
  }

  interface PaletteOptions {
    mainBackground?: PaletteOptions['primary'];
  }
  interface Palette {
    ctaColor?: Palette['primary'];
  }

  interface PaletteOptions {
    ctaColor?: PaletteOptions['primary'];
  }
}
export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Sintony", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"kon-tiki-aloha-jf", sans-serif',
      fontWeight: '800',
      marginBottom: '.75em',
      fontSize: '36px',
    },
    h2: {
      fontFamily: '"Faustina", serif',
      marginBottom: '12px',
      fontWeight: '800',
    },
    h3: {
      marginBottom: '12px',
    },
    h4: {
      fontFamily: '"kon-tiki-aloha-jf", sans-serif',
      marginBottom: '.25em',
    },
    h5: {
      fontFamily: '"kon-tiki-aloha-jf", sans-serif',
      marginBottom: '.25em',
    },
    h6: {
      fontFamily: '"kon-tiki-aloha-jf", sans-serif',
      marginBottom: '.25em',
    },
  },
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#000',
    },
    mainBackground: {
      main: '#fff',
    },
    ctaColor: {
      main: '#ef4426',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 10px #e1e1e1',
        },
      },
    },
  },
};
const mdTheme = createTheme(themeOptions);
export { mdTheme };

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainContainer content={<MainWithRedirect />} />,
      errorElement: <MainContainer content={<ErrorEl />} />,
    },
    {
      path: '/manage/*',
      element: <CustomAdminRoutes />,
    },
  ]);
  return (
    <ScopedCssBaseline>
      <ThemeProvider theme={mdTheme}>
          <RouterProvider router={router} />
      </ThemeProvider>
    </ScopedCssBaseline>
  );
}

export default App;
