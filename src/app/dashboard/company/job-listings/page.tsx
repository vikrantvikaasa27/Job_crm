import Link from 'next/link';
import prisma from '@/lib/prisma';
import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { MoreVertical, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const JobListings = async () => {
  const session = await getServerSession(authOptions);

  const jobs = (await prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  })) as [];

  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Job Listings</h1>
        <Link href="/dashboard/company/post-a-job">
          <Button type="button" size="sm">
            <Plus className="mr-2" />
            <span>Post a job</span>
          </Button>
        </Link>
      </div>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Needs</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job: TJob) => (
                <TableRow key={job.id}>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>
                    {new Date(job.dueDate).getTime() > Date.now() ? (
                      <Badge>Live</Badge>
                    ) : (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </TableCell>
                  <TableCell>{format(job.datePosted, 'PP')}</TableCell>
                  <TableCell>{format(job.dueDate, 'PP')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.jobType}</Badge>
                  </TableCell>
                  <TableCell>{job.totalApplicants}</TableCell>
                  <TableCell>
                    {job.totalApplicants} / {job.totalNeeds}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/company/job-detail/${job.id}`}>
                      <Button size="icon" variant="outline">
                        <MoreVertical />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="text-center">
                <TableCell colSpan={8}>No job here</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListings;
