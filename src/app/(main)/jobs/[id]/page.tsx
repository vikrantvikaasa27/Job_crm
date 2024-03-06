import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { TBenefit } from '@/types';
import { Separator } from '@/components/ui/separator';
import { BenefitCard } from '@/components/molecules';

import InfoJob from './_idPartials/InfoJob';
import InfoItem from './_idPartials/InfoItem';

interface DetailJobPageProps {
  params: {
    id: string;
  };
}

const DetailJobPage = async ({ params }: DetailJobPageProps) => {
  const { id } = params;

  const job = await prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      category: true,
      company: true,
    },
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <section className="bg-slate-100 py-10">
        <div className="container px-5 sm:px-8">
          <InfoJob
            jobId={job?.id!!}
            role={job?.role!!}
            location={job?.company?.location!!}
            logo={job?.company?.logo!!}
            companyName={job?.company?.name!!}
          />
        </div>
      </section>
      <section className="container px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-12 gap-5 md:gap-10">
        <div className="col-span-full md:col-span-7 lg:col-span-8">
          <h4 className="text-xl sm:text-2xl font-semibold mb-3">
            Description
          </h4>
          <div
            dangerouslySetInnerHTML={{
              __html: job?.description ?? '',
            }}
          ></div>
        </div>
        <div className="mt-5 col-span-full md:col-span-5 lg:col-span-4">
          <div className="space-y-3">
            <InfoItem
              title="Apply Before"
              description={format(job?.dueDate!!, 'PP')}
            />
            <InfoItem
              title="Posted On"
              description={format(job?.datePosted!!, 'PP')}
            />
            <InfoItem title="Job Type" description={job?.jobType!!} />
            <InfoItem
              title="Salary"
              description={`${job?.salaryFrom} - ${job?.salaryTo}`}
            />
          </div>
          <Separator className="my-5" />
          <div>
            <div className="text-xl sm:text-2xl font-semibold mb-3">
              Category
            </div>
            <div className="w-max bg-primary py-1 px-2 rounded-sm">
              <p className="text-sm text-white font-medium">
                {job?.category?.name}
              </p>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <div className="text-xl sm:text-2xl font-semibold mb-3">
              Required Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {job?.requiredSkills?.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <Separator />
          <div className="mb-7 mt-5">
            <div className="text-xl sm:text-2xl font-semibold">
              Perks & Benefits
            </div>
            <div className="text-gray-500 mt-1">
              This job comes with several perks and benefits
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {job?.benefits &&
              JSON.parse(JSON.stringify(job?.benefits)).map(
                (benefit: TBenefit, index: number) => (
                  <BenefitCard
                    key={index}
                    name={benefit.name}
                    description={benefit.description}
                  />
                )
              )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailJobPage;
