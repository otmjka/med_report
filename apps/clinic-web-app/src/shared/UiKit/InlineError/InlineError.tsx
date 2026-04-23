import { type FC } from 'react';

type InlineErrorProps = {
  isError: boolean;
  error: unknown;
  testId?: string;
};

const InlineError: FC<InlineErrorProps> = ({
  isError,
  error,
  testId = 'inline-error',
}) => {
  if (!isError) return null;
  const message = error instanceof Error ? error.message : String(error);
  return (
    <span data-testid={testId} className="text-sm text-red-500">
      {message}
    </span>
  );
};

export default InlineError;
