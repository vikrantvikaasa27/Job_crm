import prisma from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { TApplicant } from '@/types';
import { MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TabApplicantsProps {
  jobId: string;
}

const TabApplicants = async ({ jobId }: TabApplicantsProps) => {
  const applicants = (await prisma.applicant.findMany({
    where: {
      jobId,
    },
    include: {
      jobseeker: true,
    },
  })) as TApplicant[];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
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
              <TableCell>{format(applicant.applyDate, 'PP')}</TableCell>
              <TableCell>
                <Badge>{applicant.status}</Badge>
              </TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <MoreVertical />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="text-center">
            <TableCell colSpan={4}>No one has applied yet</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default TabApplicants;
