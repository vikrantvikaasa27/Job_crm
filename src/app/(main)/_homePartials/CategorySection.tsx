'use client'  
import { TCategory } from '@/types';
import { useCategories } from '@/features/jobs';
import { categoryPlaceholder } from '@/lib/placeholder';
import { CardSkeleton, CategoryCard } from '@/components/molecules';

import SectionLayout from './SectionLayout';

const CategorySection = () => {
  const { data: categories, isFetching } = useCategories({
    data: categoryPlaceholder(4),
  });

  return (
    <SectionLayout title={['Explore by', 'category']} url="/">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
        {!isFetching &&
          categories?.data?.slice(0, 8)?.map((category: TCategory) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        {isFetching &&
          categoryPlaceholder(8).map((_, index) => (
            <CardSkeleton key={index} type="category" />
          ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;

