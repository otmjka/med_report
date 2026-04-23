import { type FC, type ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode;
};

const PageContent: FC<PageContentProps> = ({ children }) => {
  return (
    <main data-testid="page-content" className="flex flex-col gap-4 p-6">
      {children}
    </main>
  );
};

export default PageContent;
