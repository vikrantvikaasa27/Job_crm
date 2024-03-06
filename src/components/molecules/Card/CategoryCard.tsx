import Link from 'next/link';
import { LayoutGrid, MoveRight } from 'lucide-react';
import { TCategory } from '@/types';

interface CategoryCardProps {
  category: TCategory & {
    _count?: {
      jobs?: number;
    };
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href="/">
      <div className="h-full border rounded-md p-4 md:p-6 group hover:border-primary hover:bg-primary hover:text-white transition-colors">
        <LayoutGrid className="w-12 h-12 text-primary group-hover:text-white" />
        <div className="mt-7">
          <div className="text-xl md:text-2xl font-semibold">
            {category.name}
          </div>
          <div className="text-sm sm:text-base text-muted-foreground flex items-center gap-1 mt-1 group-hover:text-white">
            <span>{category._count?.jobs} jobs available</span>
            <MoveRight className="hover:text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
