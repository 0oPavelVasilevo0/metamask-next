'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import SelectMoney from '../Select/SelectMoney';
import { RiExchangeLine } from 'react-icons/ri';
import MoneyButtons from '../Buttons/MoneyButtons';
import { useMetaMask } from '@/hooks/useMetaMask';
import { PiCurrencyBtcFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';

export default function DisplayExchange() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { wallet } = useMetaMask()

    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
    };

    return (
        <Box sx={{
            display: isSmallScreen ? 'flex' : 'grid',
            flexDirection: isSmallScreen ? 'column' : undefined,
            gridTemplateColumns: isSmallScreen ? undefined : '34ch 5ch 34ch',
            justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
        }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" startIcon={<PiCurrencyBtcFill />} onClick={() => handleCoinClick('BTC')} >
                            BTC
                        </Button>
                        <Button variant="outlined" startIcon={<FaEthereum />} onClick={() => handleCoinClick('ETH')} >
                            ETH
                        </Button>
                        <Button variant="outlined" startIcon={<SiTether />} onClick={() => handleCoinClick('USDT')} >
                            USDT
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mb: 0, mt: 0 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                            balance: {
                                selectedCoin === 'BTC' ? wallet.bscBalance :
                                    selectedCoin === 'ETH' ? wallet.ethBalance :
                                        wallet.ethChainId
                            }
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">{selectedCoin}</InputAdornment>}
                            label="balance: 0.000"
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color={'red'}>rates crypto</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Exchange</Button>
            </Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: '44', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" startIcon={<PiCurrencyBtcFill />} onClick={() => handleCoinClick('BTC')} >
                            BTC
                        </Button>
                        <Button variant="outlined" startIcon={<FaEthereum />} onClick={() => handleCoinClick('ETH')} >
                            ETH
                        </Button>
                        <Button variant="outlined" startIcon={<SiTether />} onClick={() => handleCoinClick('USDT')} >
                            USDT
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mb: 0, mt: 0 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                            balance: {
                                selectedCoin === 'BTC' ? wallet.bscBalance :
                                    selectedCoin === 'ETH' ? wallet.ethBalance :
                                        wallet.ethChainId
                            }
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">{selectedCoin}</InputAdornment>}
                            label="balance: 0.000"
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
