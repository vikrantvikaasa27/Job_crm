'use client';

import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { formApplySchema } from '@/lib/validations';
import { jobseekerApplyAPI } from '@/fetcher/account';
import { supabaseUploadFile } from '@/lib/supabase';
import { InputText, UploadResume } from '@/components/atoms';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormApplyProps {
  jobId: string;
}

const FormApply = ({ jobId }: FormApplyProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formApplySchema>>({
    resolver: zodResolver(formApplySchema),
    defaultValues: {
      fullname: '',
      email: '',
      phoneNumber: '',
      linkedIn: '',
      portofolio: '',
      coverLetter: '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formApplySchema>) => {
    try {
      const { filename } = await supabaseUploadFile(val.resume, 'resumes');

      const data = {
        jobId: jobId,
        resume: filename,
        coverLetter: val.coverLetter ?? '',
      };

      const res = await jobseekerApplyAPI(data);

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
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Apply</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm w-full max-h-screen overflow-y-scroll">
        <h6 className="text-lg font-semibold">Submit your application</h6>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <InputText
                control={form.control}
                name="fullname"
                type="text"
                label="Full Name"
                placeholder="Jhon Smith"
              />
              <InputText
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="jhon@example.com"
              />
              <div className="col-span-full">
                <InputText
                  control={form.control}
                  name="phoneNumber"
                  type="number"
                  label="Phone Number"
                  placeholder="08123456789"
                />
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <div className="grid grid-cols-2 gap-6">
                <InputText
                  control={form.control}
                  name="linkedIn"
                  type="text"
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/jhon-smith"
                />
                <InputText
                  control={form.control}
                  name="portofolio"
                  type="text"
                  label="Portofolio URL"
                  placeholder="https://jhonsmith.com"
                />
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add a cover letter or anything else you want to share"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="my-6">
              <UploadResume form={form} name="resume" />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Loading...' : 'Apply'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormApply;
