interface InfoItemProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const InfoItem = ({ title, description, children }: InfoItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white p-3 rounded-full">{children}</div>
      <div>
        <h5 className="text-gray-500">{title}</h5>
        <p className="font-semibold text-[14px] sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default InfoItem;
