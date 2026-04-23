import { type FC, type ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <section
      data-testid="section"
      className="flex items-center justify-between gap-4"
    >
      {children}
    </section>
  );
};

export default Section;
