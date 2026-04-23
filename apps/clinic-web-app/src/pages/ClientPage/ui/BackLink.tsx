import { type FC } from 'react';
import { Link } from 'react-router';

const BackLink: FC = () => {
  return (
    <Link
      data-testid="back-to-clients"
      to="/clients"
      className="text-sm hover:underline"
    >
      &larr; Back to clients
    </Link>
  );
};

export default BackLink;
