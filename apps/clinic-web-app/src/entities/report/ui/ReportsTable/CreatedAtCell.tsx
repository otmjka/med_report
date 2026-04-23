import { type FC } from 'react';

type CreatedAtCellProps = {
  createdAt: string;
};

const CreatedAtCell: FC<CreatedAtCellProps> = ({ createdAt }) => {
  const date = new Date(createdAt);
  return <span className="text-muted-foreground">{date.toLocaleString()}</span>;
};

export default CreatedAtCell;
