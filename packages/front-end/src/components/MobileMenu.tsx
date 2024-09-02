import React from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { getMenuElements } from './HeaderMenu';
export default function MobileMenu() {
  const [anchorElNavMobile, setAnchorElNavMobile] =
    React.useState<null | HTMLElement>(null);

  const handleOpenMobileNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavMobile(event.currentTarget);
  };
  const handleCloseMobileNavMenu = () => {
    setAnchorElNavMobile(null);
  };
  const menuElements = getMenuElements();
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMobileNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNavMobile}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNavMobile)}
        onClose={handleCloseMobileNavMenu}
        sx={{
          display: { xs: 'flex', md: 'none' },
        }}
      >
        {menuElements.map((el) => (
          <MenuItem
            key={el.name}
            component={RouterLink}
            to={el.to}
            onClick={handleCloseMobileNavMenu}
          >
            {el.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
