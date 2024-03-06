import Image from 'next/image';
import { patternInk } from '@/images';

interface TopSectionProps {
  title: [string, string];
  description: string;
  children: React.ReactNode;
}

const TopSection = ({ title, description, children }: TopSectionProps) => {
  return (
    <section className="bg-slate-100 py-10 sm:py-16">
      <div className="container px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <h1 className="text-4xl sm:text-5xl font-semibold">{title[0]}</h1>
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl font-semibold text-primary">
              {title[1]}
            </h1>
            <div className="absolute inset-x-0">
              <Image
                src={patternInk}
                alt="pattern"
                width={200}
                height={30}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="max-w-sm mx-auto my-10 text-center text-gray-500">
          {description}
        </div>
        <div className="w-full flex justify-center mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default TopSection;
