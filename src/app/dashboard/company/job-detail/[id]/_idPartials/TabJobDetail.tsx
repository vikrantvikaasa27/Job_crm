import prisma from '@/lib/prisma';
import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { BenefitCard } from '@/components/molecules';

interface TabJobDetailProps {
  jobId: string;
}

const TabJobDetail = async ({ jobId }: TabJobDetailProps) => {
  const job = (await prisma.job.findFirst({
    where: {
      id: jobId,
    },
    include: {
      category: true,
    },
  })) as TJob;

  return (
    <div className="grid grid-cols-12 gap-5 lg:gap-10">
      <div className="col-span-full lg:col-span-7 xl:col-span-8">
        <div className="text-2xl font-semibold mb-3">Description</div>
        <div
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: job.description,
          }}
        ></div>
      </div>
      <div className="mt-5 col-span-full lg:col-span-5 xl:col-span-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Apply Before</div>
            <div className="font-semibold">{format(job.dueDate, 'PP')}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Job Posted On</div>
            <div className="font-semibold">{format(job.datePosted, 'PP')}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Job Type</div>
            <div className="font-semibold">{job.jobType}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Salary</div>
            <div className="font-semibold">{`${job.salaryFrom} - ${job.salaryTo}`}</div>
          </div>
        </div>
        <Separator className="my-5" />
        <div>
          <div className="text-2xl font-semibold mb-3">Category</div>
          <div className="w-max bg-primary py-1 px-2 rounded-sm">
            <p className="text-sm text-white font-medium">
              {job.category?.name}
            </p>
          </div>
        </div>
        <Separator className="my-5" />
        <div>
          <div className="text-2xl font-semibold mb-3">Required Skills</div>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill: string, i: number) => (
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
          <div className="text-2xl font-semibold">Perks & Benefits</div>
          <div className="text-gray-500 mt-1">
            This job comes with several perks and benefits
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {job.benefits.map((benefit: any, index: number) => (
            <BenefitCard
              key={index}
              name={benefit.name}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabJobDetail;
