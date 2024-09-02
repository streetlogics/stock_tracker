import { Link } from '@mui/material';
import Linkify from 'react-linkify';

function TextWithLinks({ textValue }: { textValue: string | null }) {
  if (!textValue) {
    return textValue;
  }
  return (
    <Linkify
      componentDecorator={(
        decoratedHref: string,
        decoratedText: string,
        key: any,
      ) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={decoratedHref}
          key={key}
          sx={{ color: (theme) => theme.palette.ctaColor?.main }}
        >
          {decoratedText}
        </Link>
      )}
    >
      {textValue}
    </Linkify>
  );
}

export default TextWithLinks;
