'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useMetaMask } from '@/hooks/useMetaMask';
import { PiCurrencyBtcFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';
import useCryptoData from '@/hooks/useCryptoData';

export default function DisplayExchange() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { wallet } = useMetaMask()

    const [selectedCoin, setSelectedCoin] = useState('choose a coin');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
    };
    //data crypto
    const { bitcoin, ethereum, tether } = useCryptoData();

    //rating crypto
    const [ratesCrypto, setRatesCrypto] = useState('')
    const handleRatesClick = (rates: React.SetStateAction<string>) => {
        setRatesCrypto(rates)
    }
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
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth variant="outlined" startIcon={<PiCurrencyBtcFill />} onClick={() => {
                            handleCoinClick('BTC')
                            handleRatesClick(`1.00 USDT = ${bitcoin?.usd} USD`)
                        }} >
                            BTC
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<FaEthereum />} onClick={() => {
                             handleCoinClick('ETH')
                            handleRatesClick(`1.00 USDT = ${ethereum?.usd} USD`)
                             }} >
                            ETH
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<SiTether />} onClick={() => {
                         handleCoinClick('USDT')
                            handleRatesClick(`1.00 USDT = ${tether?.usd} USD`)
                         }} >
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
                                        ''
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
                    <Typography fontSize={10} color='secondary'>{ratesCrypto}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Button sx={{ m: 2, width: '100px' }} color='info' variant='contained'>Exchange</Button>
            </Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: '44', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth variant="outlined" startIcon={<PiCurrencyBtcFill />} onClick={() => handleCoinClick('BTC')} >
                            BTC
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<FaEthereum />} onClick={() => handleCoinClick('ETH')} >
                            ETH
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<SiTether />} onClick={() => handleCoinClick('USDT')} >
                            USDT
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mt: 0, }}>
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
