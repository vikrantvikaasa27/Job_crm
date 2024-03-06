import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TCompany } from '@/types';
import { getImageSrc } from '@/lib/utils';
import { Building, MapPin } from 'lucide-react';

interface CompanyCard {
  company: TCompany & {
    _count?: {
      jobs?: number;
    };
  };
}

const CompanyCard = ({ company }: CompanyCard) => {
  return (
    <Link href={`/companies/${company.id}`}>
      <div className="h-full border p-6">
        <div className="flex items-start justify-between">
          <Image
            src={getImageSrc(company.logo, company.name)}
            alt="Company logo"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-full"
          />
          <Badge className="rounded-sm">{company._count?.jobs} Jobs</Badge>
        </div>
        <div className="space-y-1 mt-3">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            <span className="text-lg font-semibold">{company.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{company.location}</span>
          </div>
        </div>
        <div
          className="text-muted-foreground line-clamp-3 my-4"
          dangerouslySetInnerHTML={{
            __html: company.overview,
          }}
        ></div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-2 rounded-none">
            {company.industry}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
