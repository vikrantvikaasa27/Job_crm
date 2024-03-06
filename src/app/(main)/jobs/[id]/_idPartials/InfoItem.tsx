interface InfoItemProps {
  title: string;
  description: string;
}

const InfoItem = ({ title, description }: InfoItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-500">{title}</div>
      <div className="font-semibold">{description}</div>
    </div>
  );
};

export default InfoItem;
