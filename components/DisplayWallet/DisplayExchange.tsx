'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useMetaMask } from '@/hooks/useMetaMask';
import { PiCurrencyBtcFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';
import { SiBinance } from "react-icons/si";
import useCryptoData from '@/hooks/useCryptoData';

export default function DisplayExchange() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { wallet } = useMetaMask()

    const [selectedCoin, setSelectedCoin] = useState('');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
        setSelectedExchangeCoin('')
    };
    const [selectedExchangeCoin, setSelectedExchangeCoin] = useState('');
    const handleExchangeCoinClick = (coinExchange: React.SetStateAction<string>) => {
        setSelectedExchangeCoin(coinExchange);
    };

    // const [inputClicked, setInputClicked] = useState(false)

    //data crypto
    const { binancecoin, bitcoin, ethereum, tether } = useCryptoData();

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
                        <Button fullWidth
                            variant={selectedCoin === 'BNB' ? 'contained' : 'outlined'}
                            startIcon={<SiBinance fill='orange' />}
                            onClick={() => {
                                handleCoinClick('BNB')
                                // handleRatesClick(`1.00 ${selectedCoin} = ${ethereum?.usd} ${selectedExchangeCoin}`)
                            }}
                        >
                            BNB
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleCoinClick('ETH')
                                // handleRatesClick(`1.00 ETH = ${ethereum?.usd} USD`)
                            }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'USDT' ? 'contained' : 'outlined'}
                            startIcon={<SiTether fill='limeGreen' />}
                            onClick={() => {
                                handleCoinClick('USDT')
                                // handleRatesClick(`1.00 USDT = ${tether?.usd} USD`)
                            }}
                        >
                            USDT
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mb: 0, mt: 0 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                            balance: {
                                selectedCoin === 'BNB' ? wallet.bnbBalance :
                                    selectedCoin === 'ETH' ? wallet.ethBalance :
                                        'chooce coin'
                                //  wallet.accounts[0]
                            }
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">
                                <Typography
                                    color={
                                        selectedCoin === 'BNB' ? 'orange' :
                                            selectedCoin === 'ETH' ? 'DodgerBlue' :
                                                selectedCoin === 'USDT' ? 'lightGreen' : 'dark'}>
                                    {selectedCoin}
                                </Typography>
                                </InputAdornment>}
                            label="balance: 00000"
                            disabled={selectedCoin ? false : true}  // Обновляем disabled в зависимости от выбранной монеты
                        // onFocus={() => setInputClicked(true)} // Обработчик для нажатия на input
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedExchangeCoin ? ratesCrypto : ''}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Button sx={{ m: 2, width: '100px' }} color='warning'
                    variant='contained'
                    disabled={selectedCoin ? false : true}
                >
                    Exchange
                </Button>
            </Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: '44', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
                            // color='info'
                            variant={selectedExchangeCoin === 'BNB' ? 'contained' : 'outlined'}
                            startIcon={<SiBinance fill='orange' />}
                            onClick={() => {
                                handleExchangeCoinClick('BNB')
                                handleRatesClick(
                                    selectedCoin === 'ETH' && ethereum && ethereum.usd && binancecoin && binancecoin.usd ? `1.00 ${selectedCoin} = ${(ethereum?.usd / binancecoin?.usd).toFixed(2)} BNB` :
                                        selectedCoin === 'USDT' && tether && tether.usd && binancecoin && binancecoin.usd ? `1.00 ${selectedCoin} = ${(tether?.usd / binancecoin?.usd).toFixed(5)} BNB` :
                                            ''
                                )
                            }}
                            disabled={(selectedCoin === 'BNB' ? true : false) || (selectedCoin ? false : true)}
                        >
                            BNB
                        </Button>
                        <Button fullWidth
                            // color='info'
                            variant={selectedExchangeCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleExchangeCoinClick('ETH')
                                //  handleRatesClick(`1.00 ${selectedCoin} = ${ethereum?.usd} ETH`)
                                handleRatesClick(
                                    selectedCoin === 'BNB' && ethereum && ethereum.usd && binancecoin && binancecoin.usd ? `1.00 ${selectedCoin} = ${(binancecoin?.usd / ethereum?.usd).toFixed(2)} ETH` :
                                        selectedCoin === 'USDT' && tether && tether.usd && ethereum && ethereum.usd ? `1.00 ${selectedCoin} = ${(tether?.usd / ethereum?.usd).toFixed(5)} ETH` :
                                            ''
                                )
                            }}
                            disabled={(selectedCoin === 'ETH' ? true : false) || (selectedCoin ? false : true)}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            // color='info'
                            variant={selectedExchangeCoin === 'USDT' ? 'contained' : 'outlined'}
                            startIcon={<SiTether fill='limeGreen' />}
                            onClick={() => {
                                handleExchangeCoinClick('USDT')
                                handleRatesClick(
                                    selectedCoin === 'BNB' && tether && tether.usd && binancecoin && binancecoin.usd ? `1.00 ${selectedCoin} = ${(binancecoin?.usd / tether?.usd).toFixed(2)} USDT` :
                                        selectedCoin === 'ETH' && tether && tether.usd && ethereum && ethereum.usd ? `1.00 ${selectedCoin} = ${(ethereum.usd / tether?.usd).toFixed(2)} USDT` :
                                            ''
                                )
                            }}
                            disabled={(selectedCoin === 'USDT' ? true : false) || (selectedCoin ? false : true)}
                        >
                            USDT
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mt: 0, }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                            balance: {
                                selectedExchangeCoin === 'BNB' ? wallet.bnbBalance :
                                    selectedExchangeCoin === 'ETH' ? wallet.ethBalance :
                                        // wallet.bnbChainId
                                        'choose coin'
                            }
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Typography
                                        color={
                                            selectedExchangeCoin === 'BNB' ? 'orange' :
                                                selectedExchangeCoin === 'ETH' ? 'DodgerBlue' :
                                                    selectedExchangeCoin === 'USDT' ? 'limeGreen' : 'dark'}>
                                        {selectedExchangeCoin}
                                    </Typography>
                                </InputAdornment>
                            }
                            label="balance: 0.000"
                            disabled={(selectedCoin ? false : true) || (selectedExchangeCoin ? false : true)}
                            readOnly
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
