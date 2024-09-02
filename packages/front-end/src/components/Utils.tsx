import { Link, ButtonProps, Button } from '@mui/material';
import { dateFormat } from '../App';
import moment from 'moment';

export const formatDate = (date: string, datePrior?: string) => {
  const formattedDate = new Date(moment(date).format(dateFormat));

  return formattedDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface CTAButtonProps extends ButtonProps {
  href: string;
  text: string;
  mb?: number
}

export const CTAButton: React.FC<CTAButtonProps> = ({ href, text, mb, ...props }) => {
  return (
    <Button
      variant="contained"
      href={href}
      component={Link}
      sx={{
        backgroundColor: (theme) => theme.palette.ctaColor?.main,
        color: '#fff',
        fontFamily: '"kon-tiki-aloha-jf", sans-serif',
        mb: mb || 0,
        mt: 1,
        p: '5px 10px',
        fontSize: '1.2em',
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export const getUserToken = () => {
  return localStorage.getItem('access_token');
};