"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
export interface Balance {
  bitcoin: number
  bitcoinOnChain: number
  bitcoinLightning: number
  ethereum: number
  litecoin: number
  monero: number
  totalFiat: number
  bitcoinFiat: number
  ethereumFiat: number
  erc20Tokens: Array<{
    symbol: string
    balance: number
    fiatValue: number
  }>
}

export interface Transaction {
  id: string
  type: "send" | "receive" | "lightning"
  amount: number
  currency: string
  fiatAmount: number
  description: string
  timestamp: string
  network: string
  status: "confirmed" | "pending" | "failed"
}

export interface LightningChannel {
  id: string
  peer: string
  capacity: number
  localBalance: number
  remoteBalance: number
  status: "active" | "inactive" | "pending"
  uptime: string
}

interface WalletContextType {
  balances: Balance
  transactions: Transaction[]
  lightningChannels: LightningChannel[]
  lightningBalance: number
  refreshBalances: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  // Mock data for demonstration
  const [balances, setBalances] = useState<Balance>({
    bitcoin: 0.05,
    bitcoinOnChain: 0.03,
    bitcoinLightning: 0.02,
    ethereum: 1.2,
    litecoin: 2.5,
    monero: 0.75,
    totalFiat: 5000,
    bitcoinFiat: 3000,
    ethereumFiat: 1800,
    erc20Tokens: [
      { symbol: "USDT", balance: 500, fiatValue: 500 },
      { symbol: "USDC", balance: 200, fiatValue: 200 },
    ],
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      type: "receive",
      amount: 0.01,
      currency: "BTC",
      fiatAmount: 600,
      description: "Payment from Alice",
      timestamp: "2025-05-10T14:30:00Z",
      network: "bitcoin",
      status: "confirmed",
    },
    {
      id: "tx2",
      type: "send",
      amount: 0.5,
      currency: "ETH",
      fiatAmount: 750,
      description: "Payment to Bob",
      timestamp: "2025-05-09T10:15:00Z",
      network: "ethereum",
      status: "confirmed",
    },
    {
      id: "tx3",
      type: "lightning",
      amount: 50000,
      currency: "sats",
      fiatAmount: 30,
      description: "Coffee shop payment",
      timestamp: "2025-05-08T08:45:00Z",
      network: "bitcoin",
      status: "confirmed",
    },
    {
      id: "tx4",
      type: "send",
      amount: 1.5,
      currency: "LTC",
      fiatAmount: 120,
      description: "Payment to Charlie",
      timestamp: "2025-05-07T16:20:00Z",
      network: "litecoin",
      status: "confirmed",
    },
    {
      id: "tx5",
      type: "receive",
      amount: 0.25,
      currency: "XMR",
      fiatAmount: 80,
      description: "Payment from Dave",
      timestamp: "2025-05-06T12:10:00Z",
      network: "monero",
      status: "confirmed",
    },
  ])

  const [lightningChannels, setLightningChannels] = useState<LightningChannel[]>([
    {
      id: "chan1",
      peer: "ACINQ",
      capacity: 1000000,
      localBalance: 600000,
      remoteBalance: 400000,
      status: "active",
      uptime: "30 days",
    },
    {
      id: "chan2",
      peer: "Bitfinex",
      capacity: 800000,
      localBalance: 300000,
      remoteBalance: 500000,
      status: "active",
      uptime: "15 days",
    },
    {
      id: "chan3",
      peer: "LNBig",
      capacity: 500000,
      localBalance: 250000,
      remoteBalance: 250000,
      status: "inactive",
      uptime: "5 days",
    },
  ])

  const lightningBalance = 0.02

  const refreshBalances = () => {
    // In a real app, this would fetch updated balances from your wallet API
    console.log("Refreshing balances...")
  }

  useEffect(() => {
    // In a real app, this would initialize connections to blockchain nodes
    console.log("Initializing wallet connections...")
  }, [])

  return (
    <WalletContext.Provider
      value={{
        balances,
        transactions,
        lightningChannels,
        lightningBalance,
        refreshBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
