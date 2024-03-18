import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import PopoverWallet from '../PopoverWallet/PopoverWallet'
import { formatAddress } from '@/utils'
import { useMetaMask } from '@/hooks/useMetaMask'

export default function WalletNavigation() {

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

    return (
        <Box sx={{ m: 2 }}>
            {!hasProvider &&
                <Button variant="contained">
                    <a href="https://metamask.io" target="_blank" rel="noreferrer">
                        Install MetaMask
                    </a>
                </Button>
            }
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
                <Button variant="contained" disabled={isConnecting} onClick={connectMetaMask}>
                    Connect MetaMask
                </Button>
            }
            {hasProvider && wallet.accounts.length > 0 &&
                <Box sx={{  display: 'flex', justifyContent: 'center' }}>
                    <PopoverWallet />
                    {/* <Typography>
                        Metamask Wallet
                    </Typography>
                    <Button variant="outlined">
                        <a
                            className="text_link"
                            href={`https://etherscan.io/address/${wallet}`}
                            target="_blank"
                            data-tooltip="Open in Block Explorer" rel="noreferrer"
                        >
                            {formatAddress(wallet.accounts[0])}
                        </a>
                    </Button> */}
                </Box>
            }
        </Box>
    )
}
