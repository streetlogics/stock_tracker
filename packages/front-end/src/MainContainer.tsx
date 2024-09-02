import { Box, Container } from '@mui/material';
import { Header } from './Header';
export const initialHeight = {
  xs: 'calc(100vh - 88px)',
  sm: 'calc(100vh - 92px)',
};

export const MainContainer = (props: { content: JSX.Element }) => {
  const { content } = props;
  return (
    <>
      <Header />
      <Container component="main">
        <Box
          sx={{
            mt: '65px',
            mb: 4,
            pt: 2,
            minHeight: initialHeight,
          }}
        >
          {content}
        </Box>
      </Container>
    </>
  );
};
