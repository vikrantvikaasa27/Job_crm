import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

import FormSettings from './_settingsPartials/FormSettings';

const CompanySettingsPage = async () => {
  const session = await getServerSession(authOptions);

  const account = await prisma.account.findFirst({
    where: {
      id: session?.user.accountId,
    },
  });

  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-5">
        <FormSettings account={account!!} />
      </div>
    </div>
  );
};

export default CompanySettingsPage;
