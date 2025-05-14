import type React from 'react';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/toaster';
import {WalletProvider} from './wallet-provider';
import {Sidebar} from '@/components/sidebar';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Lightning Network Multi-Blockchain Wallet',
  description: 'A modern wallet for Lightning Network with multi-blockchain support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <WalletProvider>
            <div className='relative flex min-h-screen bg-background'>
              <Sidebar />
              <main className='flex-1 overflow-auto p-4 md:p-6 transition-all duration-200'>
                <div className='mx-auto max-w-7xl'>{children}</div>
              </main>
            </div>
          </WalletProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
