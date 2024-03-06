import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Avatar } from '@/components/atoms';
import { JobCard } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import { Building, Flame, MapPin, UsersRound } from 'lucide-react';

import InfoItem from './_idPartials/InfoItem';

interface DetailCompanyPageProps {
  params: {
    id: string;
  };
}

const DetailCompanyPage = async ({ params }: DetailCompanyPageProps) => {
  const company = await prisma.company.findFirst({
    where: {
      id: params.id,
    },
    include: {
      socialMedia: true,
      jobs: {
        where: {
          dueDate: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      },
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });

  return (
    <main className="min-h-[calc(100vh-452px)]">
      <section className="bg-slate-100 py-10">
        <div className="container px-5 sm:px-8">
          <div className="w-full sm:w-10/12 mx-auto">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-32 md:h-32">
                <Avatar
                  image={company?.logo}
                  fallback={company?.name!!}
                  size={150}
                />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold">
                    {company?.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className="border-primary rounded-none text-primary py-1.5 px-2.5 whitespace-nowrap"
                  >
                    {company?._count.jobs} Jobs
                  </Badge>
                </div>
                <a
                  href={company?.website!!}
                  target="_blank"
                  className="font-semibold text-primary block mt-2"
                >
                  {company?.website}
                </a>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
              <InfoItem
                title="Founded"
                description={format(company?.dateFounded!!, 'PP')}
              >
                <Flame className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Employees" description={company?.employee!!}>
                <UsersRound className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Location" description={company?.location!!}>
                <MapPin className="w-6 h-6 text-primary" />
              </InfoItem>
              <InfoItem title="Industry" description={company?.industry!!}>
                <Building className="w-6 h-6 text-primary" />
              </InfoItem>
            </div>
          </div>
        </div>
      </section>
      <section className="container px-5 sm:px-8 py-8 sm:py-16">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3">
            Company Profile
          </h3>
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: company?.overview!!,
            }}
          ></div>
        </div>
        <Separator className="my-5 sm:my-8" />
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">
            Jobs in {company?.name}
          </h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
            {company?.jobs ? (
              company?.jobs.map((job: any) => (
                <JobCard key={job.id} job={job} variant="company" />
              ))
            ) : (
              <h6 className="text-center">No Jobs</h6>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailCompanyPage;
