import {
  LucideIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';

const ListIcon: Record<string, LucideIcon> = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin,
};

interface SocialIconProps {
  name: string;
  className?: string;
}

const SocialIcon = ({ name, className }: SocialIconProps) => {
  const Icon = ListIcon[name];

  return <Icon className={className} />;
};

export default SocialIcon;
