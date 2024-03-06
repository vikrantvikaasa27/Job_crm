'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ListSkeleton from '../Skeleton/ListSkeleton';

interface FormFilterPorps {
  title: string;
  fitlerName: string;
  filterList: Record<string, string>[];
  isLoading?: boolean;
}

const FormFilter = ({
  title,
  fitlerName,
  filterList,
  isLoading = true,
}: FormFilterPorps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setFilter((prev) => [...prev, value]);
    } else {
      setFilter((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter.length) {
      const filterQuery = filter.join(',');

      params.set(fitlerName, filterQuery);
      router.push(pathname + '?' + params.toString(), { scroll: false });
      setShowFilter(false);
    }
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    setFilter([]);
    params.delete(fitlerName);
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  return (
    <>
      <aside
        className={cn(
          'w-full lg:w-3/12 pt-10 lg:pt-0 bg-white fixed inset-0 z-50 lg:static justify-center hidden lg:block',
          showFilter && 'flex'
        )}
      >
        <div className="max-w-xs w-full">
          <div className="flex item-center justify-between">
            <h5 className="font-semibold">{title}</h5>
            <Button
              size="icon"
              className="w-7 h-7 lg:hidden"
              onClick={() => setShowFilter(false)}
            >
              <X />
            </Button>
          </div>
          <div className="mt-5 space-y-4 mb-5">
          {!isLoading && filterList && filterList.length > 0 ? (
  filterList.map((item) => (
    <div key={item.id} className="flex gap-3 text-sm">
      <input
        type="checkbox"
        id={item.id}
        value={item.name}
        checked={filter.includes(item.name)}
        onChange={handleFilter}
      />
      <label htmlFor={item.id}>{item.name}</label>
    </div>
  ))
) : (
  !isLoading && <p>No filter items available</p>
)}

          </div>
          <Separator />
          <div className="flex flex-col gap-3 mt-5">
            <Button onClick={handleSubmit}>Apply Filter</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Filter
            </Button>
          </div>
        </div>
      </aside>
      <Button
        className="flex items-center gap-2 absolute top-12 sm:top-16 right-5 sm:right-8 lg:hidden"
        onClick={() => setShowFilter(true)}
      >
        <Filter />
        <span>Filter</span>
      </Button>
    </>
  );
};

export default FormFilter;
