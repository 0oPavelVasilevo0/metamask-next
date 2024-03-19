'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import SelectMoney from '../Select/SelectMoney';
import MoneyButtons from '../Buttons/MoneyButtons';
import { PiCurrencyBtcFill, PiCurrencyRubFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { useMetaMask } from '@/hooks/useMetaMask';
import { CiRepeat } from 'react-icons/ci';
import useCryptoData from '@/hooks/useCryptoData';
import { HiMiniCurrencyDollar, HiMiniCurrencyEuro } from 'react-icons/hi2';

// const currencies = [

//     {
//         value: 'ETH',
//         label: 'ETH',
//     },
//     {
//         value: 'BTC',
//         label: 'BTC',
//     },
// ];
// const currencies = [

//     {
//         value: 'USD',
//         label: 'USD',
//     },
//     {
//         value: 'EUR',
//         label: 'EUR',
//     },
// ];

// const NoBorderTextField = styled(TextField)({
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             border: 'none',
//         },
//     },
// });

const NoBorderTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
});


export default function DisplayBuy() {
//media query
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

//Metamask    
    const { wallet } = useMetaMask()

//select Coin
    const [selectedCoin, setSelectedCoin] = useState('BTC')
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
    };

//select Cash
    const [selectedCash, setSelectedCash] = useState('USD')
    const handleCashClick = (cash: React.SetStateAction<string>) => {
        setSelectedCash(cash)
    }

//data from coingecko.com
    // const cryptoData = useCryptoData()
    const { bitcoin, ethereum, tether } = useCryptoData();

//rating crypto
    const [ratesCrypto, setRatesCrypto] = useState('')
    const handleRatesClick = (rates: React.SetStateAction<string>) => {
        setRatesCrypto(rates)
    }

    // useEffect(() => {
    //     if (bitcoin && bitcoin.usd) {
    //         setSelectedCoin('BTC');
    //         setRatesCrypto(`1.00 USD = ${bitcoin.usd} ${selectedCash}`);
    //     }
    // }, [bitcoin, selectedCash]);

    useEffect(() => {
        // Обновляем данные в зависимости от выбранной валюты
        let rate;
        switch (selectedCash) {
            case 'USD':
                rate = bitcoin?.usd;
                break;
            case 'EUR':
                rate = bitcoin?.eur;
                break;
            case 'RUB':
                rate = bitcoin?.rub;
                break;
            default:
                rate = bitcoin?.usd; // По умолчанию используем USD
        }
        setRatesCrypto(rate ? `1.00 ${selectedCoin} = ${rate} ${selectedCash}` : '');
    }, [selectedCoin, selectedCash, bitcoin]);

    return (
        <Box sx={
            {
                display: isSmallScreen ? 'flex' : 'grid',
                flexDirection: isSmallScreen ? 'column' : undefined,
                gridTemplateColumns: isSmallScreen ? undefined : '34ch 5ch 34ch',
                justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
            }
        }
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" startIcon={<PiCurrencyBtcFill />} onClick={() => {
                            handleCoinClick('BTC')
                            handleRatesClick(`1.00 BTC = ${bitcoin?.usd} $`)
                        }} >
                            BTC
                        </Button>
                        <Button variant="outlined" startIcon={<FaEthereum />} onClick={() => {
                            handleCoinClick('ETH')
                            handleRatesClick(`1.00 ETH = ${ethereum?.usd} $`)
                            }} >
                            ETH
                        </Button>
                        <Button variant="outlined" startIcon={<SiTether />} onClick={() => {
                            handleCoinClick('USDT')
                            handleRatesClick(`1.00 USDT = ${tether?.usd} $`)
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
                    <Typography fontSize={10} color={'red'}>{ratesCrypto}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Buy</Button>
            </Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: '44', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" startIcon={<HiMiniCurrencyDollar />} onClick={() => handleCashClick('USD')}>
                            USD
                        </Button>
                        <Button variant="outlined" startIcon={<HiMiniCurrencyEuro />} onClick={() => handleCashClick('EUR')}>
                            EUR
                        </Button>
                        <Button variant="outlined" startIcon={<PiCurrencyRubFill />} onClick={() => handleCashClick('RUB')}>
                            RUB
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mt: 0, mb: 0 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">{selectedCash}</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
