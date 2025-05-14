"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const networks = [
  {
    value: "bitcoin-ln",
    label: "Bitcoin (Lightning)",
    icon: "₿",
  },
  {
    value: "ethereum",
    label: "Ethereum",
    icon: "Ξ",
  },
  {
    value: "litecoin",
    label: "Litecoin",
    icon: "Ł",
  },
  {
    value: "monero",
    label: "Monero",
    icon: "ɱ",
  },
]

interface NetworkSelectorProps {
  isCollapsed?: boolean;
}

export function NetworkSelector({isCollapsed = false}: NetworkSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', isCollapsed && 'px-2')}
        >
          <div className='flex items-center'>
            <span className='mr-2 text-lg'>{selectedNetwork.icon}</span>
            {!isCollapsed && <span>{selectedNetwork.label}</span>}
          </div>
          {!isCollapsed && <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search network...' />
          <CommandList>
            <CommandEmpty>No network found.</CommandEmpty>
            <CommandGroup>
              {networks.map((network) => (
                <CommandItem
                  key={network.value}
                  value={network.value}
                  onSelect={() => {
                    setSelectedNetwork(network);
                    setOpen(false);
                  }}
                >
                  <span className='mr-2 text-lg'>{network.icon}</span>
                  <span>{network.label}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedNetwork.value === network.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
