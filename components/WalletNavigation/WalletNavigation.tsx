'use client'
import { Box, Button, Link, Tooltip, useMediaQuery, useTheme } from '@mui/material'
// import React from 'react'
import PopoverWallet from '../PopoverWallet/PopoverWallet'
import { useMetaMask } from '@/hooks/useMetaMask'
import { customTheme } from '../theme/theme';
import ToggleColorModeButton from '../ThemeModeButton/ToggleColorModeButton';

declare global {
    interface Window {
        ethereum: any;
    }
}

export default function WalletNavigation() {

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

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

        <Box sx={{ m: (hasProvider && wallet.accounts.length > 0) ? 2 : 0 }}>
            {/* Показываем кнопку для установки MetaMask, если провайдер не установлен */}
            {!hasProvider && (
                <Box sx={{ display: 'flex', justifyContent: 'center', transform: isSmallScreen ? 'translateY(43vh)' : 'none' }}>
                    <Button color='warning' variant='contained' size='large'>
                        <Link
                            underline="none"
                            href="https://metamask.io"
                            target="_blank"
                            rel="noreferrer">
                            Install MetaMask
                        </Link>
                    </Button>
                </Box>
            )}

            {/* Показываем кнопку для подключения к MetaMask, если провайдер установлен */}
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', transform: isSmallScreen ? 'translateY(43vh)' : 'none' }}>
                    <Button size='large' color='warning' variant='contained' disabled={isConnecting} onClick={connectMetaMask}>
                        Connect MetaMask
                    </Button>
                </Box>
            )}

            {/* Показываем компонент PopoverWallet, если провайдер установлен и есть аккаунты */}
            {hasProvider && wallet.accounts.length > 0 && (
                <Box sx={{ display: 'flex', ml: isExtraSmallScreen ? '0' : '28px', alignItems: 'center' }}>
                    <Box mr={'auto'} ml={'auto'}>
                        <PopoverWallet />
                    </Box>
                    <Box >
                        <ToggleColorModeButton />
                    </Box>
                </Box>
            )}

        </Box>
    )
}
