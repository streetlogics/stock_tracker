import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getMenuElements } from './HeaderMenu';

export default function DesktopMenu() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
      {getMenuElements().map((el) => (
        <Link
          key={el.name}
          component={el.name === 'Contact' ? 'a' : RouterLink}
          underline="hover"
          to={el.to}
          href={el.to}
          p={2}
          sx={{
            color: (theme) => theme.palette.ctaColor?.main,
            fontFamily: '"kon-tiki-aloha-jf", sans-serif',
          }}
        >
          {el.name}
        </Link>
      ))}
    </Box>
  );
}
