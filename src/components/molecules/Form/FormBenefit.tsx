'use client';

import { useState } from 'react';
import { TBenefit } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';

interface FormBenefitProps {
  onAddBenefit: (item: TBenefit) => void;
}

const FormBenefit = ({ onAddBenefit }: FormBenefitProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleAddBenefit = () => {
    if (name.trim() === '' || description.trim() === '') return;

    setName('');
    setDescription('');
    onAddBenefit({
      name,
      description,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Benefit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Benefit</DialogTitle>
          <DialogDescription>
            Make a new benefit, click add when your done
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 mb-5">
          <div>
            <Label htmlFor="benefit" className="block mb-2">
              Benefit
            </Label>
            <Input
              id="benefit"
              placeholder="fill your benefit..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description" className="block mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="fill your description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleAddBenefit}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormBenefit;
