import { type FC } from 'react';
import { Link } from 'react-router';

type ClientLinkCellProps = {
  clientId: number | null;
  clientName: string | null;
};

const ClientLinkCell: FC<ClientLinkCellProps> = ({ clientId, clientName }) => {
  if (!clientId) return <span className="text-muted-foreground">—</span>;
  return (
    <Link to={`/clients/${clientId}`} className="font-medium hover:underline">
      {clientName ?? `#${clientId}`}
    </Link>
  );
};

export default ClientLinkCell;
