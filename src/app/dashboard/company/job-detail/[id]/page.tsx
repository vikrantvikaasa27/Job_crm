import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import TabApplicants from './_idPartials/TabApplicants';
import TabJobDetail from './_idPartials/TabJobDetail';

const CompanyJobDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="py-5">
      <div>
        <h1 className="text-xl font-semibold">Fullstack developer</h1>
        <p>Techonology . Full-Time</p>
      </div>
      <div className="max-w-screen-xl w-full mt-5">
        <Tabs defaultValue="applicants">
          <TabsList className="mb-8">
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="jobDetail">Job Detail</TabsTrigger>
          </TabsList>
          <TabsContent value="applicants">
            <TabApplicants jobId={id} />
          </TabsContent>
          <TabsContent value="jobDetail">
            <TabJobDetail jobId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default CompanyJobDetail;
