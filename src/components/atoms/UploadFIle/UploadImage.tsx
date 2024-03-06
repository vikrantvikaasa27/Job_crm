'use client';

import Image from 'next/image';
import { supabaseGetFile } from '@/lib/supabase';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface UploadImageProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  defaultValue: string;
}

const UploadImage = <T extends FieldValues>({
  form,
  name,
  defaultValue,
}: UploadImageProps<T>) => {
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (defaultValue) {
      const { url } = supabaseGetFile(defaultValue, 'images');
      setPreviewImg(url);
    }
  }, [defaultValue]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      form.setValue(name, e.target.files[0] as any);
    }
  };

  return (
    <div>
      <div className="flex gap-3 sm:gap-5 mb-2">
        <div className="w-36 h-24 sm:w-48 sm:h-32 aspect-square overflow-hidden rounded-sm">
          {previewImg !== '' ? (
            <Image
              width={128}
              height={128}
              src={previewImg}
              alt="preview"
              priority
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 grid place-items-center">
              <ImageIcon className="w-10 h-10 text-neutral-400" />
            </div>
          )}
        </div>
        <label
          htmlFor="imageUpload"
          className="w-full h-24 sm:h-32 border-2 border-neutral-200 border-dashed rounded-sm cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload />
          <span className="text-sm font-medium mt-1">Upload logo here</span>
          <span className="text-xs">
            max <strong>500kb</strong>
          </span>
        </label>
        <input
          id="imageUpload"
          type="file"
          className="hidden"
          onChange={(e) => handleUpload(e)}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
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

export default UploadImage;
