import Link from 'next/link';
import { MoveRight } from 'lucide-react';

interface SectionLayoutProps {
  title: [string, string];
  url: string;
  children: React.ReactNode;
}

const SectionLayout = ({ title, url, children }: SectionLayoutProps) => {
  return (
    <section className="container px-5 sm:px-8 my-10 md:my-20">
      <div className="flex items-center justify-between gap-5 mb-7">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {title[0]} <span className="text-primary">{title[1]}</span>
        </div>
        <Link
          href={url}
          className="flex gap-3 items-center text-primary font-semibold cursor-pointer text-nowrap"
        >
          <span>View all</span>
          <MoveRight />
        </Link>
      </div>
      {children}
    </section>
  );
};

export default SectionLayout;
