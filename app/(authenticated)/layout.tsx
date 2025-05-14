import React from 'react';
import {WalletProvider} from './wallet-provider';
import {Sidebar} from '@/components/sidebar';

export default function AuthenticatedLayout({children}: {children: React.ReactNode}) {
  return (
    <WalletProvider>
      <div className='relative flex min-h-screen bg-background'>
        <Sidebar />
        <main className='flex-1 overflow-auto p-4 md:p-6 transition-all duration-200'>
          <div className='mx-auto max-w-7xl'>{children}</div>
        </main>
      </div>
    </WalletProvider>
  );
}
