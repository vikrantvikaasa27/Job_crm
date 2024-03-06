'use client';

import { TJob } from '@/types';
import { useJobs } from '@/features/jobs';
import { CardSkeleton, JobCard } from '@/components/molecules';

import SectionLayout from './SectionLayout';

const LatestJobSection = () => {
  const { data: jobs, isFetching } = useJobs({
    data: [1, 2, 3],
  });

  return (
    <SectionLayout title={['Latest', 'jobs']} url="/jobs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {!isFetching
          ? jobs?.data?.map((job: TJob) => <JobCard key={job.id} job={job} />)
          : jobs?.data?.map((item: number) => (
              <CardSkeleton key={item} type="job" />
            ))}
      </div>
    </SectionLayout>
  );
};

export default LatestJobSection;
