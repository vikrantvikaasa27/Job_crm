'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LINK_OPTIONS } from '@/constants';
import { createLinkAPI } from '@/fetcher/account';
import { formLinkSchema } from '@/lib/validations';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import InputSelect from './InputSelect';
import InputText from './InputText';

const InputSocialLink = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formLinkSchema>>({
    resolver: zodResolver(formLinkSchema),
    defaultValues: {
      link: '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formLinkSchema>) => {
    try {
      const res = await createLinkAPI(val);

      if (res.status === 'error') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: res.message,
      });
      setOpen(!open);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-5 h-5 mr-2" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <InputSelect
              control={form.control}
              name="name"
              label="Name"
              placeholder="Select link name"
            >
              {LINK_OPTIONS.map((link: string, index: number) => (
                <SelectItem key={index} value={link}>
                  {link}
                </SelectItem>
              ))}
            </InputSelect>
            <InputText
              control={form.control}
              name="link"
              type="text"
              label="Url"
              placeholder="https://example.com"
            />
            <div className="flex justify-end">
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Loading...' : 'Add'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InputSocialLink;
