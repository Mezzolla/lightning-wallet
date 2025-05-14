import Link from 'next/link';
import {Zap, Shield, Wallet, Globe, Lock} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function VetrinaPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6'>
        <Link href='/' className='flex items-center gap-2 font-bold'>
          <Zap className='h-5 w-5' />
          <span>Lightning Wallet</span>
        </Link>
        <div className='flex items-center gap-2'>
          <Link href='/auth/login'>
            <Button variant='outline' size='sm'>
              Log in
            </Button>
          </Link>
          <Link href='/auth/register'>
            <Button size='sm'>Register</Button>
          </Link>
        </div>
      </header>

      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted/50'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Lightning Network Multi-Blockchain Wallet
                </h1>
                <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
                  A modern wallet for Lightning Network with multi-blockchain support
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/auth/register'>
                  <Button size='lg'>Get Started</Button>
                </Link>
                <Link href='/auth/recovery'>
                  <Button variant='outline' size='lg'>
                    Recover Wallet
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Experience the Future of Payments</h2>
                <p className='text-muted-foreground md:text-lg'>
                  Our Lightning Network wallet combines the speed of Lightning with the security of multiple blockchain
                  networks, giving you a seamless payment experience.
                </p>
              </div>
              <div className='grid gap-6 sm:grid-cols-2'>
                <Card>
                  <CardHeader className='pb-2'>
                    <Zap className='h-6 w-6 text-primary' />
                    <CardTitle className='mt-2'>Lightning Fast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Instant payments with near-zero fees using the Lightning Network</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <Shield className='h-6 w-6 text-primary' />
                    <CardTitle className='mt-2'>Secure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Advanced encryption and optional 2FA to keep your funds safe</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <Wallet className='h-6 w-6 text-primary' />
                    <CardTitle className='mt-2'>Multi-chain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Support for Bitcoin, Ethereum, Litecoin, and more cryptocurrencies
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <Globe className='h-6 w-6 text-primary' />
                    <CardTitle className='mt-2'>Global</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Send and receive payments globally without borders or limitations</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted/50'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto max-w-3xl space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Ready to experience Lightning?</h2>
              <p className='text-muted-foreground md:text-lg'>
                Create your wallet in seconds and join thousands of users already enjoying the benefits of fast, secure,
                and borderless payments.
              </p>
              <div className='flex justify-center pt-4'>
                <Link href='/auth/register'>
                  <Button size='lg'>Create Your Wallet</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className='w-full border-t py-6'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='flex items-center gap-2'>
              <Zap className='h-5 w-5' />
              <p className='text-sm font-medium'>Lightning Wallet</p>
            </div>
            <p className='text-sm text-muted-foreground'>© 2025 Lightning Wallet. All rights reserved.</p>
            <div className='flex items-center gap-2'>
              <Lock className='h-4 w-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>Secure by design</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
