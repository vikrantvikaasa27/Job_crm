import { Sidebar } from '@/components/molecules';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Dashboard | Company',
  },
};

export default async function DashboardCompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-end">
      <Sidebar />
      <div className="md:max-w-[calc(100%-240px)] w-full min-h-screen p-5">
        <header className="md:max-w-[calc(100%-240px)] w-full px-5 py-2.5 fixed top-0 right-0 border-b border-b-neutral-300 backdrop-blur-sm bg-white/75">
          <p>Dashboard</p>
          <h4 className="text-lg font-medium">Company</h4>
        </header>
        <section className="pt-16">{children}</section>
      </div>
    </main>
  );
}
