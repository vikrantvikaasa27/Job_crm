import prisma from '@/lib/prisma';
import { TCompany } from '@/types';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import TabOverview from './_profilePartials/TabOverview';
import TabSocialLinks from './_profilePartials/TabSocialLinks';

const CompanyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const companyOverview = (await prisma.company.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      socialMedia: true,
    },
  })) as TCompany;

  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold">Company Profile</h1>
      <div className="mt-5">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <TabOverview company={companyOverview} />
          </TabsContent>
          <TabsContent value="socialLinks">
            <TabSocialLinks links={companyOverview.socialMedia} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
