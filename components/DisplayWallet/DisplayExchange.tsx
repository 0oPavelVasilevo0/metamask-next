'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useMetaMask } from '@/hooks/useMetaMask';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';
import { SiBinance } from "react-icons/si";
import useCryptoData from '@/hooks/useCryptoData';

export default function DisplayExchange() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { wallet } = useMetaMask()
    //data crypto
    const { binancecoin, bitcoin, ethereum, tether } = useCryptoData();

    const isTestnet = wallet.ethChainId === '0xaa36a7'

    const [selectedCoin, setSelectedCoin] = useState('');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
        setSelectedExchangeCoin('')
        setInputValue('')
        setOutputValue('')
    };
    const [selectedExchangeCoin, setSelectedExchangeCoin] = useState('');
    const handleExchangeCoinClick = (coinExchange: React.SetStateAction<string>) => {
        setSelectedExchangeCoin(coinExchange);
    };

    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    //rating crypto
    const [ratesCrypto, setRatesCrypto] = useState('')

    const handleRatesClick = (rates: string) => {
        setRatesCrypto(rates)
        setOutputValue('')
    }

    useEffect(() => {
        handleInjectChange({ target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>); //Вызываем функцию handleInjectChange при изменении selectedExchangeCoin
    }, [selectedExchangeCoin]);

    const handleInjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputAmount = parseFloat(event.target.value);
        if (!isNaN(inputAmount)) {
            setInputValue(event.target.value);
            let inject = 1;
            switch (selectedCoin) {
                case ('BNB'):
                    switch (selectedExchangeCoin) {
                        case 'ETH':
                            if (binancecoin && ethereum && binancecoin.usd && ethereum.usd)
                                inject = binancecoin?.usd / ethereum?.usd;
                            break;
                        case 'USDT':
                            if (binancecoin && tether && binancecoin.usd && tether.usd)
                                inject = binancecoin?.usd / tether?.usd;
                            break;
                        default:
                            inject = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                case 'ETH':
                    switch (selectedExchangeCoin) {
                        case 'BNB':
                            if (binancecoin && ethereum && binancecoin.usd && ethereum.usd)
                                inject = ethereum?.usd / binancecoin?.usd;
                            break;
                        case 'USDT':
                            if (ethereum && tether && ethereum.usd && tether.usd)
                                inject = ethereum?.usd / tether?.usd;
                            break;
                        default:
                            inject = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                case 'USDT':
                    switch (selectedExchangeCoin) {
                        case 'BNB':
                            if (binancecoin && tether && binancecoin.usd && tether.usd)
                                inject = tether?.usd / binancecoin?.usd;
                            break;
                        case 'ETH':
                            if (ethereum && tether && ethereum.usd && tether.usd)
                                inject = tether?.usd / ethereum.usd;
                            break;
                        default:
                            inject = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                default:
                    inject = 1; // Если выбранная монета неизвестна, используем курс 1:1
            }
            if (inject) {
                setOutputValue((inputAmount * inject).toFixed(2));
            }
        } else {
            setInputValue('');
            setOutputValue('');
        }
    };

    const redirectToSwapPage = (wallet: { accounts: string[] }) => {
        if (wallet.accounts.length > 0) {
            // const accountId = wallet.accounts[0];
            window.location.href = `https://portfolio.metamask.io/swap`;
        }
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
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
                            variant={selectedCoin === 'BNB' ? 'contained' : 'outlined'}
                            startIcon={<SiBinance fill='orange' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('BNB')
                            }}
                        >
                            BNB
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('ETH')
                            }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'USDT' ? 'contained' : 'outlined'}
                            startIcon={<SiTether fill='limeGreen' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('USDT')
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
                            value={inputValue}
                            onChange={handleInjectChange}
                            color='warning'
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedExchangeCoin ? ratesCrypto : ''}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button sx={{ m: 2, width: '100px' }} color='warning'
                        variant='contained'
                        disabled={!inputValue || !selectedExchangeCoin}
                        onClick={() => { redirectToSwapPage(wallet) }}
                    >
                        Exchange
                    </Button>
                {isTestnet && (
                    <Typography textAlign={'center'} sx={{ mt: 'auto', mb: 'auto' }} color={'error'} fontSize={12}>
                        not available on testnet
                    </Typography>
                )}
                </Box>
            </Box>
            <Box sx={{ mb: isSmallScreen ? 0 : 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: isSmallScreen ? '34' : '44', height: 'auto', transform: isSmallScreen ? 'rotate(90deg)' : 'none', fill: 'grey' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
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
                            variant={selectedExchangeCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleExchangeCoinClick('ETH')
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
                            {/* balance: {
                                selectedExchangeCoin === 'BNB' ? wallet.bnbBalance :
                                    selectedExchangeCoin === 'ETH' ? wallet.ethBalance :
                                        'choose coin'
                            } */}
                            {selectedExchangeCoin ? '': 'choose coin' }
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
                            // label="balance: 0.000"
                            disabled={(selectedCoin ? false : true) || (selectedExchangeCoin ? false : true)}
                            value={selectedExchangeCoin ? outputValue : ''}
                            readOnly
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
