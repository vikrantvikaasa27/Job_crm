import Image, { StaticImageData } from 'next/image';
import { cmpBubles, cmpDsign, cmpJobox, cmpTwins, cmpWave } from '@/images';

const clients: Record<string, StaticImageData | string>[] = [
  {
    src: cmpJobox,
    alt: 'Jobox',
  },
  {
    src: cmpDsign,
    alt: 'Dsign',
  },
  {
    src: cmpWave,
    alt: 'Wave',
  },
  {
    src: cmpTwins,
    alt: 'Twins',
  },
  {
    src: cmpBubles,
    alt: 'Bubles',
  },
];

const ClientsSection = () => {
  return (
    <section className="container px-5 sm:px-8 my-10 md:my-16">
      <h5 className="text-lg text-muted-foreground">
        Companies we helped grow
      </h5>
      <div className="mt-8 flex items-center justify-center flex-wrap gap-x-14 gap-y-10">
        {clients.map((client, i: number) => (
          <Image
            key={i}
            src={client.src}
            alt={client.alt as string}
            width={140}
            height={50}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
