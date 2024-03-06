import { Skeleton } from '@/components/ui/skeleton';

interface CardSkeletonProps {
  type: 'job' | 'category' | 'company';
}

const CardSkeleton = ({ type }: CardSkeletonProps) => {
  if (type === 'company') {
    return (
      <div className="border p-6">
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 aspect-square rounded-full" />
          <Skeleton className="w-14 h-6" />
        </div>
        <div className="w-full space-y-1 mt-3">
          <div className="flex items-center gap-1">
            <Skeleton className="w-6 h-6 rounded-sm" />
            <Skeleton className="w-full h-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-6 h-6 rounded-sm" />
            <Skeleton className="w-full h-6" />
          </div>
        </div>
        <Skeleton className="w-full h-6 mt-4 mb-1" />
        <Skeleton className="w-4/5 sm:w-3/5 md:w-1/5 h-6" />
      </div>
    );
  }

  if (type === 'job') {
    return (
      <div className="h-full p-6 pt-10 border rounded-md space-y-4">
        <div className="flex items-center gap-5">
          <Skeleton className="w-20 aspect-square rounded-full" />
          <div className="space-y-1 w-full">
            <div className="flex items-center gap-1">
              <Skeleton className="w-6 h-6 rounded-sm" />
              <Skeleton className="w-full h-6" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="w-6 h-6 rounded-sm" />
              <Skeleton className="w-full h-6" />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-4" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((item: number) => (
            <Skeleton key={item} className="w-1/5 h-5" />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'category') {
    return (
      <div className="border rounded-md p-4 md:p-6 group hover:border-primary hover:bg-primary hover:text-white transition-colors">
        <Skeleton className="w-12 h-12" />
        <div className="mt-7 space-y-2.5">
          <Skeleton className="w-full h-7" />
          <Skeleton className="w-4/5 h-5" />
        </div>
      </div>
    );
  }

  return null;
};
export default CardSkeleton;
