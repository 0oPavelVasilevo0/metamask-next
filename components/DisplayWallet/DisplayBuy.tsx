'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { PiCurrencyBtcFill, PiCurrencyRubFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiBinance, SiTether } from 'react-icons/si';
import { useMetaMask } from '@/hooks/useMetaMask';
import { CiRepeat } from 'react-icons/ci';
import useCryptoData from '@/hooks/useCryptoData';
import { HiMiniCurrencyDollar, HiMiniCurrencyEuro } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import path from 'path';

const NoBorderTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '10px',
        },
    },
});

export default function DisplayBuy() {
    //media query
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    //active button
    // const [isBtnActive, setIsBtnActive] = useState(false);
    // const [isBtnFocused, setIsBtnFocused] = useState(false);

    //Metamask    
    const { wallet } = useMetaMask()
    //data from coingecko.com
    const { binancecoin, ethereum, tether } = useCryptoData();

    //select Coin
    const [selectedCoin, setSelectedCoin] = useState('')
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin)
        setInputValue('')
        setOutputValue('')
    };

    //select Cash
    const [selectedCash, setSelectedCash] = useState('USD')
    // рабочий вариант
    // const handleCashClick = (cash: React.SetStateAction<string>) => {
    //     setSelectedCash(cash)
    // }
    //новый вариант
    const handleCashClick = (cash: string) => {
        setSelectedCash(cash); // Обновляем выбранную валюту
        // Обновляем курс в зависимости от выбранной валюты
        let rate;
        switch (selectedCoin) {
            case 'BNB':
                rate = cash === 'USD' ? binancecoin?.usd : cash === 'EUR' ? binancecoin?.eur : cash === 'RUB' ? binancecoin?.rub : 0;
                break;
            case 'ETH':
                rate = cash === 'USD' ? ethereum?.usd : cash === 'EUR' ? ethereum?.eur : cash === 'RUB' ? ethereum?.rub : 0;
                break;
            case 'USDT':
                rate = cash === 'USD' ? tether?.usd : cash === 'EUR' ? tether?.eur : cash === 'RUB' ? tether?.rub : 0;
                break;
            default:
                rate = 0; // Если выбранная монета неизвестна, используем курс 0
                break;
        }
        setRatesCrypto(`1.00 ${selectedCoin} = ${rate} ${cash}`); // Устанавливаем новый курс в состояние
    };
    //Эта функция будет возвращать курс для указанной криптовалюты (BNB, ETH, USDT) в выбранной валюте (USD, EUR, RUB)
    const ratesInSelectedCash = (coin: string) => {
        switch (selectedCash) {
            case 'USD':
                return coin === 'BNB' ? binancecoin?.usd : coin === 'ETH' ? ethereum?.usd : coin === 'USDT' ? tether?.usd : 0;
            case 'EUR':
                return coin === 'BNB' ? binancecoin?.eur : coin === 'ETH' ? ethereum?.eur : coin === 'USDT' ? tether?.eur : 0;
            case 'RUB':
                return coin === 'BNB' ? binancecoin?.rub : coin === 'ETH' ? ethereum?.rub : coin === 'USDT' ? tether?.rub : 0;
            default:
                return 0; // Если выбранная валюта неизвестна, вернуть 0
        }
    };
    

    //rating crypto
    const [ratesCrypto, setRatesCrypto] = useState('')
    const handleRatesClick = (rates: React.SetStateAction<string>) => {
        setRatesCrypto(rates)
    }

    // Обновляем состояние ввода при изменении выбранной монеты или валюты
    useEffect(() => {
        handleInputChange({ target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>); // Вызываем функцию handleInputChange при изменении selectedCash
    }, [selectedCash]);

    //input value
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputAmount = parseFloat(event.target.value);
        if (!isNaN(inputAmount)) {
            setInputValue(event.target.value);
            let rate;
            switch (selectedCoin) {
                case ('BNB'):
                    // rate = binancecoin?.usd;
                    // break;
                    switch (selectedCash) {
                        case 'USD':
                            rate = binancecoin?.usd;
                            break;
                        case 'EUR':
                            rate = binancecoin?.eur;
                            break;
                        case 'RUB':
                            rate = binancecoin?.rub;
                            break;
                        default:
                            rate = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                case 'ETH':
                    // rate = ethereum?.usd;
                    // break;
                    switch (selectedCash) {
                        case 'USD':
                            rate = ethereum?.usd;
                            break;
                        case 'EUR':
                            rate = ethereum?.eur;
                            break;
                        case 'RUB':
                            rate = ethereum?.rub;
                            break;
                        default:
                            rate = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                case 'USDT':
                    // rate = tether?.usd;
                    // break;
                    switch (selectedCash) {
                        case 'USD':
                            rate = tether?.usd;
                            break;
                        case 'EUR':
                            rate = tether?.eur;
                            break;
                        case 'RUB':
                            rate = tether?.rub;
                            break;
                        default:
                            rate = 1; // Если выбранная валюта неизвестна, используем курс 1:1
                            break;
                    }
                    break;
                default:
                    rate = 1; // Если выбранная монета неизвестна, используем курс 1:1
            }
            if (rate) {
                setOutputValue((inputAmount * rate).toFixed(2));
            }
        } else {
            setInputValue('');
            setOutputValue('');
        }
    };

    return (
        <Box sx={
            {
                display: isSmallScreen ? 'flex' : 'grid',
                // height: isSmallScreen ? '100vh' : undefined,
                // width: isSmallScreen ? '100vw' : undefined,
                flexDirection: isSmallScreen ? 'column' : undefined,
                gridTemplateColumns: isSmallScreen ? undefined : '34ch 5ch 34ch',
                justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
            }
        }
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
                            // color='info'
                            variant={selectedCoin === 'BNB' ? 'contained' : 'outlined'}
                            startIcon={<SiBinance fill='orange' />}
                            onClick={() => {
                                handleCoinClick('BNB')
                                // handleRatesClick(`1.00 BNB = ${binancecoin?.usd} USD`)
                                handleRatesClick(`1.00 BNB = ${ratesInSelectedCash('BNB')} ${selectedCash}`)
                                // setIsBtnActive(true);
                            }} >
                            BNB
                        </Button>
                        <Button fullWidth
                            // sx={{ color: 'blue', background: 'lime' }}
                            // color='info'
                            variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleCoinClick('ETH')
                                // handleRatesClick(`1.00 ETH = ${ethereum?.usd} USD`)
                                handleRatesClick(`1.00 ETH = ${ratesInSelectedCash('ETH')} ${selectedCash}`)
                                // setIsBtnFocused(true);
                            }}
                        // onFocus={() => {
                        //     if (selectedCoin === 'ETH') {
                        //         setIsBtnFocused(false);
                        //     }
                        // }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            // color='info'
                            variant={selectedCoin === 'USDT' ? 'contained' : 'outlined'}
                            startIcon={<SiTether fill='limeGreen' />}
                            onClick={() => {
                                handleCoinClick('USDT')
                                // handleRatesClick(`1.00 USDT = ${tether?.usd} USD`)
                                handleRatesClick(`1.00 USDT = ${ratesInSelectedCash('USDT')} ${selectedCash}`)
                            }} >
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
                                        'choose coin'
                            }
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">
                                <Typography
                                    color={
                                        selectedCoin === 'BNB' ? 'orange' :
                                            selectedCoin === 'ETH' ? 'DodgerBlue' :
                                                selectedCoin === 'USDT' ? 'limeGreen' : 'dark'}>
                                    {selectedCoin}
                                </Typography>
                            </InputAdornment>}
                            label="balance: 0.000"
                            disabled={selectedCoin ? false : true}
                            value={inputValue}
                            onChange={handleInputChange}
                            color='warning'
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedCoin ? ratesCrypto : ''}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
                </Box>
                <Button sx={{ m: 2, width: '100px' }} color='warning'
                    variant="contained"
                    disabled={selectedCoin ? false : true}
                >
                    Buy
                </Button>
            </Box>
            <Box sx={{ mb: isSmallScreen ? 0 : 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: isSmallScreen ? '34' : '44', height: 'auto', transform: isSmallScreen ? 'rotate(90deg)' : 'none', fill: 'grey' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
                            color='success'
                            variant={selectedCash === 'USD' ? 'contained' : 'outlined'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<HiMiniCurrencyDollar />}
                            onClick={() => handleCashClick('USD')}>
                            USD
                        </Button>
                        <Button fullWidth
                            color='success'
                            variant={selectedCash === 'EUR' ? 'contained' : 'outlined'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<HiMiniCurrencyEuro />}
                            onClick={() => { handleCashClick('EUR') }}>
                            EUR
                        </Button>
                        <Button fullWidth
                            color='success'
                            variant={selectedCash === 'RUB' ? 'contained' : 'outlined'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<PiCurrencyRubFill />}
                            onClick={() => handleCashClick('RUB')}>
                            RUB
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl fullWidth sx={{ m: 2, mt: 0, }}>
                        <InputLabel htmlFor="outlined-adornment-amount">output amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end"><Typography color={'teal'}>{selectedCash}</Typography></InputAdornment>}
                            label="output amount"
                            // disabled={selectedCoin ? false : true}
                            disabled={outputValue ? false : true}
                            value={outputValue}
                            readOnly
                            color='error'
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
