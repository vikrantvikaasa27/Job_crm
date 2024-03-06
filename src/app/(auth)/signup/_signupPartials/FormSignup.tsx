'use client';

import Link from 'next/link';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signupAPI } from '@/fetcher/auth';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSignupSchema } from '@/lib/validations';
import { InputSelect, InputText } from '@/components/atoms';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const FormSignup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (val: z.infer<typeof formSignupSchema>) => {
    try {
      if (val.role !== 'JOBSEEKER' && val.role !== 'COMPANY') {
        throw new Error('Something worng, please try again!');
      }

      const res = await signupAPI(val);

      if (res.status !== 'success') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: 'Create account successfully. Redirecting...',
      });

      setTimeout(() => {
        router.push('/signin');
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: error.message,
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Come join with us</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <InputText
              control={form.control}
              name="username"
              type="text"
              label="Username"
              placeholder="jhon"
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
            <InputSelect
              control={form.control}
              name="role"
              label="Who you are"
              placeholder="Select your role type"
            >
              <SelectItem value="JOBSEEKER">Jobseeker</SelectItem>
              <SelectItem value="COMPANY">Company</SelectItem>
            </InputSelect>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Loading...' : 'Create an account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-gray-500 text-sm mt-6 mx-auto">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary font-medium">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormSignup;
