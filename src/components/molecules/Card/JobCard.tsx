import Link from 'next/link';
import Image from 'next/image';
import { TJob } from '@/types';
import { Badge } from '@/components/ui/badge';
import { getImageSrc } from '@/lib/utils';
import { Building, MapPin } from 'lucide-react';

interface JobCardProps {
  job: TJob;
  variant?: 'primary' | 'company';
}

const JobCard = ({ job, variant = 'primary' }: JobCardProps) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="h-full p-6 pt-10 border rounded-md relative overflow-hidden">
        <div className="bg-primary py-1 px-2 text-white text-sm font-medium rounded-bl-md absolute top-0 right-0">
          <span>{job.jobType}</span>
        </div>
        {variant !== 'company' ? (
          <div className="flex items-center gap-5 mb-5">
            <Image
              src={getImageSrc(job.company?.logo, job.company?.name!!)}
              alt="Company logo"
              width={56}
              height={56}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span className="font-medium">{job.company?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{job.company?.location}</span>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div className="text-lg font-semibold">{job.role}</div>
          <div className="text-sm font-medium flex items-center gap-2">
            {job.salaryFrom} - Rp. {job.salaryTo}
          </div>
        </div>
        {variant === 'company' ? (
          <div
            className="text-muted-foreground line-clamp-2 text-ellipsis mt-3"
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          ></div>
        ) : null}
        <div className="flex flex-wrap gap-2 mt-5">
          {job.requiredSkills
            ?.slice(0, 3)
            .map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-primary bg-primary/5 border-primary rounded"
              >
                {skill}
              </Badge>
            ))}
          {job.requiredSkills?.length > 3 && (
            <span className="text-sm text-primary font-medium">
              {job.requiredSkills?.length - 3}+
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
