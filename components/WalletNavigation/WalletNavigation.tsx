import { Box, Button } from '@mui/material'
import React from 'react'
import PopoverWallet from '../PopoverWallet/PopoverWallet'
import { useMetaMask } from '@/hooks/useMetaMask'

export default function WalletNavigation() {

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

    return (
        <Box sx={{ m: 2, }}>
            {!hasProvider &&
                <Button>
                    <a href="https://metamask.io" target="_blank" rel="noreferrer">
                        Install MetaMask
                    </a>
                </Button>
            }
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
                <Button color='info' disabled={isConnecting} onClick={connectMetaMask}>
                    Connect MetaMask
                </Button>
            }
            {hasProvider && wallet.accounts.length > 0 &&
                <Box sx={{  display: 'flex', justifyContent: 'center' }}>
                    <PopoverWallet />
                </Box>
            }
        </Box>
    )
}
