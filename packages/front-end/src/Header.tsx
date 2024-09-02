import { AppBar, Box, Toolbar } from '@mui/material';
import HeaderMenu from './components/HeaderMenu';
export const Header = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mainBackground?.main || '#000',
      }}
    >
      <Toolbar>
        <Box sx={{ flex: 1, display: 'flex', py: 0.75 }}>
          Stock Tracker
        </Box>
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
};
