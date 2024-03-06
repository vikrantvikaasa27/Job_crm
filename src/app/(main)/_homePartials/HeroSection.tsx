import Image from 'next/image';
import { FormSearch } from '@/components/molecules';
import { heroImg, patternHero, patternInk } from '@/images';

const HeroSection = () => {
  return (
    <section className="container px-5 sm:px-8 flex items-center justify-between relative overflow-hidden">
      <div className="md:w-4/5 aspect-square absolute top-0 right-0 -z-10">
        <Image
          src={patternHero}
          alt="Hero pattern"
          width={560}
          height={560}
          className="w-full h-full origin-top-right"
        />
      </div>
      <div className="lg:w-1/2 mt-10 mx-auto text-center lg:text-left">
        <div className="max-w-lg w-full mx-auto lg:mx-0">
          <h1 className="text-5xl md:text-7xl font-semibold relative">
            Discover <br /> more than <br />
            <span className="text-primary mt-3">5000+ Jobs</span>
          </h1>
          <div className="mb-5">
            <Image
              src={patternInk}
              alt="Pattern ink"
              width={448}
              height={39}
              className="block max-w-md w-full mx-auto lg:mx-0 object-contain"
            />
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>
        <FormSearch
          pathname="/jobs"
          inputName="role"
          inputPlaceholder="Job title or role name"
          optionName="location"
          optionList={['Jakarta', 'Bandung', 'Semarang']}
          optionPlaceholder="Select a location"
          formDescription="Popular: UI Designer, Frontend, Data Scientist, Programmer"
        />
      </div>
      <div className="p-10 hidden lg:block">
        <Image
          src={heroImg}
          alt="Hero image"
          width={450}
          height={635}
          placeholder="blur"
          className="rounded-s-3xl rounded-br-3xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
