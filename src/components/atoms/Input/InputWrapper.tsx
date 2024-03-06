import { Separator } from '@/components/ui/separator';

interface InputWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const InputWrapper = ({ title, description, children }: InputWrapperProps) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-10">
        <div className="lg:max-w-60 w-full">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="max-w-md w-full">{children}</div>
      </div>
      <Separator className="my-7" />
    </div>
  );
};

export default InputWrapper;
