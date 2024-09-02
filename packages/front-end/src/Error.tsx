import { Box } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Box id="error-page" textAlign="center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status === 404 ? 'Page not found!' : error.message}</i>
      </p>
    </Box>
  );
}
