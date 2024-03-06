'use client';

import { TJob } from '@/types';
import { categoryPlaceholder } from '@/lib/placeholder';
import { useCategories, useJobs } from '@/features/jobs';
import {
  TopSection,
  FormFilter,
  FormSearch,
  JobCard,
  CardSkeleton,
} from '@/components/molecules';

const JobsPage = () => {
  const { data: categories, isFetching: isFetchingCategories } = useCategories({
    data: categoryPlaceholder(6),
  });

  const { data: jobs, isFetching: isFetchingJobs } = useJobs({
    data: [1, 2],
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream job']}
        description="Find your next career at companies like HubSpot, Nike, and Dropbox"
      >
        <FormSearch
          pathname="/jobs"
          inputName="role"
          inputPlaceholder="Job title or role name"
          optionName="location"
          optionPlaceholder="Search by location"
          formDescription="Popular: UI Designer, Frontend, Data Scientist, Programmer"
        />
      </TopSection>
      <section className="container px-5 sm:px-8 py-12 sm:py-16 flex items-start justify-center gap-10 relative">
        <FormFilter
          title="Category"
          fitlerName="category"
          isLoading={isFetchingCategories}
          filterList={categories?.data}
        />
        <div className="w-full">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold">All Jobs</h3>
            <p className="text-muted-foreground">
              Showing {isFetchingJobs ? 0 : jobs?.data?.length} Result
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {!isFetchingJobs
              ? jobs?.data?.map((job: TJob) => (
                  <JobCard key={job.id} job={job} />
                ))
              : jobs?.data?.map((item: number) => (
                  <CardSkeleton key={item} type="job" />
                ))}
          </div>
          {!isFetchingJobs && !jobs?.data?.length ? (
            <div className="text-center">
              <h5 className="text-2xl font-medium">No jobs :(</h5>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default JobsPage;
