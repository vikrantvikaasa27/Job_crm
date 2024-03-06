import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { imgDashboard } from '@/images';

const BannerSection = () => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container my-10 md:my-16 px-10 pt-10 sm:px-20 sm:pt-16 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-5">
        <div className="text-center lg:text-left">
          <div className="text-5xl font-semibold">
            Start posting <br /> jobs today
          </div>
          <div className="mt-3 mb-6">Start posting job for company</div>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary hover:text-white hover:bg-transparent border hover:border-white"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
        <div>
          <Image
            src={imgDashboard}
            alt="Dashboard image"
            width={500}
            height={305}
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
