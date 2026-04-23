import { type FC } from 'react';

import type { Client } from '@/entities/client';
import { H1 } from '@/shared/UiKit';

type ClientCardHeaderProps = {
  client: Client;
};

const ClientCardHeader: FC<ClientCardHeaderProps> = ({ client }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-muted-foreground text-sm">#{client.id}</div>
      <H1>{client.name}</H1>
    </div>
  );
};

export default ClientCardHeader;
