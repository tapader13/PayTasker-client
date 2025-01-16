import { Users, UserCheck, Coins, DollarSign } from 'lucide-react';

export default function AdminStat({ stats }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <div>
        <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h1 className='text-sm font-medium'>Total Workers</h1>
          <Users className='h-4 w-4 text-muted-foreground' />
        </div>
        <div>
          <div className='text-2xl font-bold'>{stats.totalWorkers}</div>
        </div>
      </div>
      <div>
        <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h1 className='text-sm font-medium'>Total Buyers</h1>
          <UserCheck className='h-4 w-4 text-muted-foreground' />
        </div>
        <div>
          <div className='text-2xl font-bold'>{stats.totalBuyers}</div>
        </div>
      </div>
      <div>
        <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h1 className='text-sm font-medium'>Total Available Coins</h1>
          <Coins className='h-4 w-4 text-muted-foreground' />
        </div>
        <div>
          <div className='text-2xl font-bold'>{stats.totalAvailableCoins}</div>
        </div>
      </div>
      <div>
        <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h1 className='text-sm font-medium'>Total Payments</h1>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </div>
        <div>
          <div className='text-2xl font-bold'>
            ${stats.totalPayments.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
