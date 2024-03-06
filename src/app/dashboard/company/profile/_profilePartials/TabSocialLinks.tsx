'use client';

import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { TLink } from '@/types';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteLinkAPI } from '@/fetcher/account';
import { InputSocialLink, InputWrapper } from '@/components/atoms';

interface TabSocialLinksProps {
  links?: TLink[];
}

const TabSocialLinks = ({ links }: TabSocialLinksProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const handleDeleteLink = async (linkId: string) => {
    try {
      setButtonDisabled(true);
      toast({
        title: 'Proccess',
        description: 'Loading...',
      });

      const res = await deleteLinkAPI(linkId);

      if (res.status === 'error') {
        throw new Error(res.message);
      }

      toast({
        title: 'Success',
        description: res.message,
      });

      router.refresh();
      setButtonDisabled(false);
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
    <InputWrapper
      title="Social Links"
      description="Add elsewhere links to your company profile."
    >
      <InputSocialLink />
      <div className="space-y-5 mt-10">
        {links &&
          links?.map((link) => (
            <div key={link.id}>
              <p>{link.name}</p>
              <div className="flex items-center gap-5 mt-1.5">
                <Input value={link.link} readOnly />
                <Button
                  size="icon"
                  variant="destructive"
                  className="w-11 h-10"
                  disabled={buttonDisabled}
                  onClick={() => handleDeleteLink(link.id!!)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </InputWrapper>
  );
};
export default TabSocialLinks;
