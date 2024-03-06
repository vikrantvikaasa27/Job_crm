'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormSearchProps {
  pathname: string;
  inputName: string;
  inputPlaceholder?: string;
  optionName: string;
  optionPlaceholder?: string;
  optionList?: string[];
  formDescription?: string;
}

const FormSearch = ({
  pathname,
  inputName,
  inputPlaceholder,
  optionName,
  optionPlaceholder,
  optionList,
  formDescription,
}: FormSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<Record<string, string>>({
    input: '',
    option: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    params.set(inputName, search.input);
    params.set(optionName, search.option);
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  return (
    <div>
      <form
        className="w-full md:w-max p-4 bg-background shadow-md flex flex-col md:flex-row gap-4 relative z-10"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-center gap-3">
          <Search className="w-6 h-6" />
          <Input
            className="lg:w-72 py-6 border-none"
            placeholder={inputPlaceholder}
            value={search.input}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, input: e.target.value }))
            }
          />
        </div>
        <div className="w-full flex gap-3 items-center">
          <MapPin className="w-6 h-6" />
          <Input
            className="lg:w-72 py-6 border-none"
            placeholder={optionPlaceholder}
            value={search.option}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, option: e.target.value }))
            }
          />
        </div>
        <Button type="submit" className="py-6 px-8">
          Search
        </Button>
      </form>
      {formDescription && (
        <div className="text-muted-foreground text-left mt-3">
          {formDescription}
        </div>
      )}
    </div>
  );
};

export default FormSearch;
