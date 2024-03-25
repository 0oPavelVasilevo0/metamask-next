'use client'
import { Box, Button } from '@mui/material'
// import React from 'react'
import PopoverWallet from '../PopoverWallet/PopoverWallet'
import { useMetaMask } from '@/hooks/useMetaMask'

declare global {
    interface Window {
        ethereum: any;
    }
}

export default function WalletNavigation() {

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

    // Проверяем, доступен ли объект window и ethereum
    // const isBrowser = typeof window !== 'undefined'
    // const isMetaMaskInstalled = isBrowser && window.ethereum?.isMetaMask

    //вариант для NEXT.js не подходит, использовал https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
    // const [isClient, setIsClient] = useState(false)

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

    return (
        // <Box sx={{ m: 2, }}>
        //     {/* Показываем кнопку для установки MetaMask, если провайдер не установлен */}
        //     {!hasProvider &&
        //         <Button>
        //             <a href="https://metamask.io" target="_blank" rel="noreferrer">
        //                 Install MetaMask
        //             </a>
        //         </Button>
        //     }
        //     {/* Показываем кнопку для подключения к MetaMask, если провайдер установлен */}
        //     {/* {typeof window !== 'undefined' && window.ethereum?.isMetaMask && wallet.accounts.length < 1 && //код внутри этого блока выполнится только в браузерной среде, избегая ошибки на сервере !!!!!НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ В NEXT */}
        //     {isMetaMaskInstalled && wallet.accounts.length < 1 &&
        //         <Button color='info' disabled={isConnecting} onClick={connectMetaMask}>
        //             Connect MetaMask
        //         </Button>
        //     }
        //     {/* Показываем компонент PopoverWallet, если провайдер установлен и есть аккаунты */}
        //     {hasProvider && wallet.accounts.length > 0 &&
        //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        //             <PopoverWallet />
        //         </Box>
        //     }
        // </Box>
        
        <Box sx={{ m: 2 }}>
            {/* Показываем кнопку для установки MetaMask, если провайдер не установлен */}
            {!hasProvider && (
                <Button>
                    <a href="https://metamask.io" target="_blank" rel="noreferrer">
                        Install MetaMask
                    </a>
                </Button>
            )}

            {/* Показываем кнопку для подключения к MetaMask, если провайдер установлен */}
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
                <Button disabled={isConnecting} onClick={connectMetaMask}>
                    Connect MetaMask
                </Button>
            )}

            {/* Показываем компонент PopoverWallet, если провайдер установлен и есть аккаунты */}
            {hasProvider && wallet.accounts.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PopoverWallet />
                </Box>
            )}
            
        </Box>
    )
}
