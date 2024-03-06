import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/atoms';
import { FormApply } from '@/components/molecules';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

interface InfoJobProps {
  jobId: string;
  role: string;
  location: string;
  logo: string;
  companyName: string;
}

const InfoJob = async ({
  jobId,
  role,
  location,
  logo,
  companyName,
}: InfoJobProps) => {
  const session = await getServerSession(authOptions);

  const isApply = await prisma.applicant.count({
    where: {
      jobseekerId: session?.user.id,
      AND: {
        jobId,
      },
    },
  });

  return (
    <div className="w-full sm:w-11/12 mx-auto sm:my-10 p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          <Avatar image={logo} fallback={companyName} size={80} />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-semibold">{role}</div>
          <div className="text-muted-foreground">
            {companyName} | {location}
          </div>
        </div>
      </div>
      {session && session.user.role === 'JOBSEEKER' && isApply !== 1 ? (
        <FormApply jobId={jobId} />
      ) : session && session.user.role === 'JOBSEEKER' && isApply === 1 ? (
        <Button disabled>Applied</Button>
      ) : !session ? (
        <Link href={`/signin?callbackUrl=/jobs/${jobId}`}>
          <Button variant="outline">Sign In First</Button>
        </Link>
      ) : null}
    </div>
  );
};

export default InfoJob;
