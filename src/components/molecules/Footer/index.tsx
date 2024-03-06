import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { logoLight } from '@/images';
import { SocialIcon } from '@/components/atoms';

const resourceLinks: string[] = ['Help Docs', 'Guide', 'Updates', 'Contact Us'];
const aboutLinks: string[] = [
  'Companies',
  'Pricing',
  'Terms',
  'Advice',
  'Privacy Policy',
];
const socialLinks: Record<string, string>[] = [
  {
    url: 'https://www.facebook.com',
    icon: 'Facebook',
  },
  {
    url: 'https://www.instagram.com',
    icon: 'Instagram',
  },
  {
    url: 'https://www.twitter.com',
    icon: 'Twitter',
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="container px-5 sm:px-8 pt-10 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          {/* logo */}
          <section className="order-1 lg:col-span-2">
            <div className="w-40">
              <Image
                src={logoLight}
                alt="logo"
                width={160}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-muted mt-5 md:max-w-96 lg:max-w-80 w-full">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </section>

          {/* about */}
          <section className="order-3 lg:order-2 text-center sm:text-left">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              About
            </h5>
            <ul className="space-y-4">
              {aboutLinks.map((item: string, i: number) => (
                <li key={i} className="block text-muted cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* resource */}
          <section className="order-4 lg:order-3 text-center sm:text-left">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              Resources
            </h5>
            <ul className="space-y-4">
              {resourceLinks.map((item: string, i: number) => (
                <li key={i} className="block text-muted cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* subscription */}
          <section className="order-2 lg:order-4 lg:col-span-2">
            <h5 className="text-lg text-primary-foreground font-semibold mb-5">
              Get job notifications
            </h5>
            <p className="text-muted">
              The latest job news, articles, sent to your inbox weekly
            </p>
            <form className="flex items-center gap-3 mt-5">
              <Input placeholder="Email Address" className="py-5" />
              <Button className="py-5" type="submit">
                Subscribe
              </Button>
            </form>
          </section>
        </div>
        <Separator className="mt-10 mb-5 bg-neutral-300" />

        {/* copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-neutral-300">
            2024 @FindingJob. All rights reserved.
          </div>
          <ul className="flex gap-5 text-white">
            {socialLinks.map((link, index: number) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
