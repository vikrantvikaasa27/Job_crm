'use client';

import { useState } from 'react';
import { TBenefit } from '@/types';
import { BenefitCard, FormBenefit } from '@/components/molecules';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';

interface InputBenefitProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

const InputBenefit = <T extends FieldValues>({
  form,
  name,
}: InputBenefitProps<T>) => {
  const [benefits, setBenefits] = useState<TBenefit[]>([]);

  const handleAddBenefits = (item: TBenefit) => {
    const newBenefits: TBenefit[] = [...benefits, item];

    setBenefits(newBenefits);
    form.setValue(name, newBenefits as any);
  };

  const handleDeleteBenefit = (item: TBenefit) => {
    const updateBenefits = benefits.filter(
      (benefit: TBenefit) => benefit !== item
    );

    setBenefits([...updateBenefits]);
    form.setValue(name, updateBenefits as any);
  };

  return (
    <div className="block">
      <FormBenefit onAddBenefit={handleAddBenefits} />
      {benefits.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
          {benefits.map((benefit: TBenefit, index: number) => (
            <div key={index} className="relative">
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDeleteBenefit(benefit)}
              >
                <X className="w-6 h-6" />
              </div>
              <BenefitCard
                name={benefit.name}
                description={benefit.description}
              />
            </div>
          ))}
        </div>
      )}
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputBenefit;
