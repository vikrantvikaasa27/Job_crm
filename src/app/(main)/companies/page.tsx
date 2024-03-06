'use client';

import { TCompany } from '@/types';
import { industryPlaceholder } from '@/lib/placeholder';
import { useCompanies, useIndustries } from '@/features/companies';
import {
  CardSkeleton,
  CompanyCard,
  FormFilter,
  FormSearch,
  TopSection,
} from '@/components/molecules';

const CompaniesPage = () => {
  const { data: industries, isFetching: isFetchingIndustries } = useIndustries({
    data: industryPlaceholder(6),
  });

  const { data: companies, isFetching: isFetchingCompanies } = useCompanies({
    data: [1, 2],
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <TopSection
        title={['Find your', 'dream company']}
        description="Find the dream company you dream work for"
      >
        <FormSearch
          pathname="/companies"
          inputName="name"
          inputPlaceholder="Company name"
          optionName="location"
          optionPlaceholder="Search by location"
          formDescription="Popular: Tokopedia, Gojek, eFishery, Blibli"
        />
      </TopSection>
      <section className="container px-5 sm:px-8 py-12 sm:py-16 flex items-start justify-center gap-10 relative">
        <FormFilter
          title="Industry"
          fitlerName="industry"
          isLoading={isFetchingIndustries}
          filterList={industries?.data}
        />
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold">
                All Companies
              </h3>
              <p className="text-muted-foreground">
                Showing {isFetchingCompanies ? 0 : companies?.data?.length}{' '}
                Result
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {!isFetchingCompanies
              ? companies?.data?.map((company: TCompany) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              : companies?.data?.map((item: number) => (
                  <CardSkeleton key={item} type="company" />
                ))}
          </div>
          {!isFetchingCompanies && !companies?.data?.length ? (
            <div className="text-center">
              <h5 className="text-2xl font-medium">No companies :(</h5>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default CompaniesPage;
