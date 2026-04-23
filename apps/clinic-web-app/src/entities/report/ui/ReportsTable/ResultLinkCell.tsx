import { type FC } from 'react';

import apiUrls from '@/shared/api/apiUrls';

type ResultLinkCellProps = {
  resultUrl: string | null;
};

const ResultLinkCell: FC<ResultLinkCellProps> = ({ resultUrl }) => {
  if (!resultUrl) return <span className="text-muted-foreground">—</span>;
  const href = `${apiUrls.baseUrl}${resultUrl}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium hover:underline"
    >
      Download
    </a>
  );
};

export default ResultLinkCell;
