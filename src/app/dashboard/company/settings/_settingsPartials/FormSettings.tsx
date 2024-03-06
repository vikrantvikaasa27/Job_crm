'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { TAccount } from '@/types';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateAccountAPI } from '@/fetcher/account';
import { formSettingSchema } from '@/lib/validations';
import { InputText, InputWrapper } from '@/components/atoms';

interface FormSettingsProps {
  account: TAccount;
}

const FormSettings = ({ account }: FormSettingsProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSettingSchema>>({
    resolver: zodResolver(formSettingSchema),
    defaultValues: {
      username: account.username ?? '',
      email: account.email ?? '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formSettingSchema>) => {
    try {
      const res = await updateAccountAPI(val);

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
        console.log(error.message);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputWrapper
          title="Account Settings"
          description="You can update your account settings here"
        >
          <div className="space-y-5">
            <InputText
              control={form.control}
              name="username"
              type="text"
              label="Username"
              placeholder="jhon123"
            />
            <InputText
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="jhon@example.com"
            />
            <InputText
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="******"
            />
            <InputText
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="******"
            />
          </div>
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

export default FormSettings;
