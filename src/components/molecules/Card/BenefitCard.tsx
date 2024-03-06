import { LayoutGrid } from 'lucide-react';

interface BenefitCardProps {
  name: string;
  description: string;
}

const BenefitCard = ({ name, description }: BenefitCardProps) => {
  return (
    <div className="border p-4 rounded-md">
      <LayoutGrid className="w-12 h-12 text-primary" />
      <div className="font-semibold text-xl mt-3">{name}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
};

export default BenefitCard;
