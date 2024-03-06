import { RadioGroup } from '@/components/ui/radio-group';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface InputRadioProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  children: React.ReactNode;
}

const InputRadio = <T extends FieldValues>({
  control,
  name,
  children,
}: InputRadioProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              {children}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputRadio;
