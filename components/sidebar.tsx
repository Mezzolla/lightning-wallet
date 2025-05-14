"use client"

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LayoutDashboard, Send, Download, Zap, History, Users, Settings, Menu, X, ChevronLeft} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {NetworkSelector} from '@/components/network-selector';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Send',
      path: '/send',
      icon: Send,
    },
    {
      name: 'Receive',
      path: '/receive',
      icon: Download,
    },
    {
      name: 'Lightning',
      path: '/lightning',
      icon: Zap,
    },
    {
      name: 'Transactions',
      path: '/transactions',
      icon: History,
    },
    {
      name: 'Contacts',
      path: '/contacts',
      icon: Users,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant='outline'
        size='icon'
        className='fixed left-4 top-4 z-40 md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className='flex h-14 items-center justify-between border-b px-4'>
          <Link href='/home' className={cn('flex items-center gap-2 font-bold', isCollapsed && 'justify-center')}>
            <Zap className='h-5 w-5' />
            {!isCollapsed && <span>Lightning Wallet</span>}
          </Link>
          <div className='flex items-center gap-2'>
            {/* Collapse Toggle Button (Desktop only) */}
            <Button variant='ghost' size='icon' className='hidden md:flex' onClick={() => setIsCollapsed(!isCollapsed)}>
              <ChevronLeft className={cn('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')} />
            </Button>
            {/* Close Button (Mobile only) */}
            <Button variant='ghost' size='icon' className='md:hidden' onClick={() => setIsOpen(false)}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className={cn('px-4 py-2', isCollapsed && 'px-2')}>
          <NetworkSelector isCollapsed={isCollapsed} />
        </div>

        <ScrollArea className='flex-1 py-2'>
          <nav className='grid gap-1 px-2'>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === route.path ? 'bg-accent text-accent-foreground' : 'transparent',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <route.icon className={cn('h-4 w-4', !isCollapsed && 'mr-2')} />
                {!isCollapsed && <span>{route.name}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Main content margin */}
      <div
        className={cn(
          'transition-all duration-200 ease-in-out',
          isOpen ? (isCollapsed ? 'md:ml-16' : 'md:ml-64') : 'md:ml-0'
        )}
      />
    </>
  );
}
