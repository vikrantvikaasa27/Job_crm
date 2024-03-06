'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { TCompany } from '@/types';
import { useRouter } from 'next/navigation';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { EMPLOYEE_OPTIONS } from '@/constants';
import { getIndustriesAPI } from '@/fetcher/company';
import { supabaseUpdateFile } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { updateCompanyOverviewAPI } from '@/fetcher/account';
import { formCompanyOverviewSchema } from '@/lib/validations';
import {
  InputCKEditor,
  InputDate,
  InputSelect,
  InputText,
  InputWrapper,
  UploadImage,
} from '@/components/atoms';

interface TabOverviewProps {
  company: TCompany;
}

const TabOverview = ({ company }: TabOverviewProps) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const router = useRouter();
  const industries = useQuery({
    queryKey: ['industries'],
    queryFn: getIndustriesAPI,
  });

  const form = useForm<z.infer<typeof formCompanyOverviewSchema>>({
    resolver: zodResolver(formCompanyOverviewSchema),
    defaultValues: {
      name: company?.name ?? '',
      overview: company?.overview ?? '',
      industry: company?.industry ?? '',
      website: company?.website ?? '',
      location: company?.location ?? '',
      employee: company?.employee ?? '',
      dateFounded: company?.dateFounded,
    },
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onSubmit = async (val: z.infer<typeof formCompanyOverviewSchema>) => {
    try {
      /// if user update logo, update file in supabase
      if (typeof val.logo === 'object') {
        const { filename } = await supabaseUpdateFile(
          val.logo,
          company.logo,
          'images'
        );
        val.logo = filename;
      } else {
        val.logo = company.logo;
      }

      const data = {
        ...val,
        isCompleted: true,
      };

      const res = await updateCompanyOverviewAPI(data);
      if (res.status === 'error') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: res.message,
      });

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Update failed',
          description: error.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <InputWrapper
          title="Company Logo"
          description="This image will be shown publicly as company logo."
        >
          <UploadImage form={form} name="logo" defaultValue={company?.logo} />
        </InputWrapper>
        <InputWrapper
          title="Company Details"
          description="Introduce your company core info quickly to users by fill up company details"
        >
          <div className="space-y-5">
            <InputText
              control={form.control}
              name="name"
              type="text"
              label="Company Name"
              placeholder="facebook"
            />
            <InputText
              control={form.control}
              name="website"
              type="text"
              label="Website"
              placeholder="https://company.com"
            />
            <InputText
              control={form.control}
              name="location"
              type="text"
              label="Location"
              placeholder="Location by city"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputSelect
                control={form.control}
                name="employee"
                label="Employee"
                placeholder="Select range your employee"
              >
                {EMPLOYEE_OPTIONS.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </InputSelect>
              <InputSelect
                control={form.control}
                name="industry"
                label="Industry"
                placeholder={
                  industries.isLoading ? 'Loading...' : 'Select your industry'
                }
              >
                {industries?.data?.data?.map((item: Record<string, string>) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </InputSelect>
            </div>
            <InputDate
              control={form.control}
              name="dateFounded"
              label="Date Founded"
            />
          </div>
        </InputWrapper>
        <InputWrapper
          title="About Company"
          description="Brief description for your company. URLs are hyperlinked."
        >
          <InputCKEditor
            form={form}
            name="overview"
            editorLoaded={editorLoaded}
          />
        </InputWrapper>
        <div className="flex justify-end">
          <Button size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Loading...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TabOverview;
