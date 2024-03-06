import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { TBucket } from '@/types';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!!
);

const getFilename = (file: File): string => {
  const prefix: string = format(new Date(), 'yyyyMMddHHmmss');
  const filename: string = prefix + '-' + file.name;

  return filename;
};

export const supabaseUploadFile = async (file: File, bucket: TBucket) => {
  const filename = getFilename(file);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`public/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return {
    data,
    error,
    filename,
  };
};

export const supabaseGetFile = (filename: string, bucket: TBucket) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return {
    url: data.publicUrl,
  };
};

export const supabaseUpdateFile = async (
  file: File,
  oldFilename: string,
  bucket: TBucket
) => {
  // delete file
  await supabase.storage.from(bucket).remove([`public/${oldFilename}`]);

  // insert file
  const newFilename = getFilename(file);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`public/${newFilename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return {
    data,
    error,
    filename: newFilename,
  };
};

export const supabaseDeleteFile = async (filename: string, bucket: TBucket) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([`public/${filename}`]);

  return {
    data,
    error,
  };
};
