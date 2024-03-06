import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TApplicant } from '@/types';
import { authOptions } from '@/lib/auth';
import { MoreVertical } from 'lucide-react';
import { getServerSession } from 'next-auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AllApplicants = async () => {
  const session = await getServerSession(authOptions);

  const applicants = (await prisma.applicant.findMany({
    include: {
      jobseeker: true,
      job: true,
    },
    where: {
      job: {
        companyId: session?.user.id,
      },
    },
  })) as TApplicant[];

  return (
    <div className="my-5">
      <h1 className="text-xl font-semibold">All Applicants</h1>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.length > 0 ? (
              applicants.map((applicant: TApplicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.jobseeker?.fullName}</TableCell>
                  <TableCell>{applicant.job?.role}</TableCell>
                  <TableCell>{format(applicant.applyDate, 'PP')}</TableCell>
                  <TableCell>
                    <Badge>{applicant.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <MoreVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={5}>No one has applied yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllApplicants;
