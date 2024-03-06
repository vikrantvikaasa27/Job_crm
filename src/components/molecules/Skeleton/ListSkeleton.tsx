import { Skeleton } from '@/components/ui/skeleton';

interface ListSkeletonProps {
  type: 'category';
}

const ListSkeleton = ({ type }: ListSkeletonProps) => {
  if (type === 'category') {
    return (
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-4 h-4 rounded-sm" />
        <Skeleton className="w-4/5 h-4 rounded-sm" />
      </div>
    );
  }

  return null;
};
export default ListSkeleton;
