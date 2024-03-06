import { Suspense } from 'react';
import { Footer, Navbar } from '@/components/molecules';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Navbar />
      {children}
      <Footer />
    </Suspense>
  );
}
