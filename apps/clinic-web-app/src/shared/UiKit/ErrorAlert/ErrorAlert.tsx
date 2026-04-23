import { type FC } from 'react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';

type ErrorAlertProps = {
  error: unknown;
  title?: string;
};

const ErrorAlert: FC<ErrorAlertProps> = ({ error, title = 'Error' }) => {
  if (!error) return null;
  const message = error instanceof Error ? error.message : String(error);
  return (
    <Alert variant="destructive" data-testid="error-alert">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
