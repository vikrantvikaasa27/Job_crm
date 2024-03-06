'use client';

import { ChangeEvent, useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';

interface UploadResumeProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

const UploadResume = <T extends FieldValues>({
  form,
  name,
}: UploadResumeProps<T>) => {
  const [nameFile, SetNameFile] = useState<string>('Attach Resume / CV');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      SetNameFile(e.target.files[0].name);
      form.setValue(name, e.target.files[0] as any);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h5 className="font-semibold">Attach your resume</h5>
      <div className="space-y-2">
        <label
          htmlFor="file"
          className="block text-xs text-primary text-center font-semibold p-3 cursor-pointer border-2 border-dashed border-primary"
        >
          {nameFile}
        </label>
        <FormField
          control={form.control}
          name={name}
          render={() => (
            <FormItem>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <input
          id="file"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadResume;
