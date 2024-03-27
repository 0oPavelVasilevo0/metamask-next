'use client'
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '../utils'

interface WalletState {
  accounts: any[]
  ethBalance: string
  ethChainId: string
  bnbBalance: string
  bnbChainId: string
}

interface MetaMaskContextData {
  wallet: WalletState
  hasProvider: boolean | null
  error: boolean
  errorMessage: string
  isConnecting: boolean
  connectMetaMask: () => void
  clearError: () => void
  switchChain: (chainId: number) => Promise<void> // Добавлено
  addChain: (chainId: number, chainName: string, rpcUrls: string[]) => Promise<void> // Добавлено
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const disconnectedState: WalletState = { accounts: [], ethBalance: '', ethChainId: '', bnbBalance: '', bnbChainId: '' }

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)

  const [isConnecting, setIsConnecting] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')

  const [wallet, setWallet] = useState(disconnectedState)
  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || await window.ethereum.request(
      { method: 'eth_accounts' },
    )

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }

    const ethBalance = formatBalance(await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }))
    const ethChainId = await window.ethereum.request({
      method: 'eth_chainId',
    })

    // For Binance Smart Chain
    const bnbBalance = formatBalance(await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
      // Use BSC chain ID
      chainId: '0x38', // Binance Smart Chain Mainnet chain ID
    }))
    const bnbChainId = '0x38' // Binance Smart Chain Mainnet chain ID

    setWallet({ accounts, ethBalance, ethChainId, bnbBalance, bnbChainId })
  }, [])

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWalletAndAccounts()
        window.ethereum.on('accountsChanged', updateWallet)
        window.ethereum.on('chainChanged', updateWalletAndAccounts)
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const connectMetaMask = async () => {
    setIsConnecting(true)

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }
  //--------------------------------------------------------------------------------------------
  const addChain = async (chainId: number, chainName: string, rpcUrls: string[]) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: chainName,
            rpcUrls: rpcUrls,
          },
        ],
      });
    } catch (error) {
      console.error("Error adding chain:", error);
    }
  };

  const switchChain = async (chainId: number) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      console.error("Error switching chain:", error);
    }
  };

  useEffect(() => {
    const handleChainChanged = async (newChainId: string) => {
      // Handle chain changed event
      // You can update balances based on the new chainId or any other logic you need
      updateWalletAndAccounts();

      // Example: Automatically switch to testnet if the user switches to mainnet
      if (newChainId === '1') { // Mainnet chainId
        await switchChain(4); // Switch to testnet (rinkeby chainId is 4)
      }
    };

    if (window.ethereum) { // Проверка наличия window.ethereum
      window.ethereum.on("chainChanged", handleChainChanged);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ERROR

      return () => {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [updateWalletAndAccounts]);
  //---------------------------------------------------------------------------------------------------
  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        switchChain, // Добавлено
        addChain // Добавлено
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
  }
  return context
}
