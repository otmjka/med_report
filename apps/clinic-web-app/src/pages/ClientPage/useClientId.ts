import { useParams } from 'react-router';

import { parseClientId } from './parseClientId';

export const useClientId = (): number => {
  const params = useParams();
  return parseClientId(params.id);
};
