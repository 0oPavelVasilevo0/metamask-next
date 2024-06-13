'use client'
import { Button, FormControl, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { PiCurrencyRubFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiBinance, SiTether } from 'react-icons/si';
import { useMetaMask } from '@/hooks/useMetaMask';
import { CiRepeat } from 'react-icons/ci';
import useCryptoData from '@/hooks/useCryptoData';
import { HiMiniCurrencyDollar, HiMiniCurrencyEuro } from 'react-icons/hi2';

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

    //Metamask    
    const { wallet } = useMetaMask()
    //data from coingecko.com
    const { binancecoin, ethereum, tether } = useCryptoData();

    const isTestnet = wallet.ethChainId === '0xaa36a7'

    //select Coin
    const [selectedCoin, setSelectedCoin] = useState('')
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin)
        setInputValue('')
        setOutputValue('')
    };

    //rating crypto
    const [ratesCrypto, setRatesCrypto] = useState('')
    const handleRatesClick = (rates: React.SetStateAction<string>) => {
        setRatesCrypto(rates)
    }
    //select Cash
    const [selectedCash, setSelectedCash] = useState<string>('USD')
    // рабочий вариант
    // const handleCashClick = (cash: React.SetStateAction<string>) => {
    //     setSelectedCash(cash)
    // }
    //новый вариант
    const handleCashClick = (cash: string) => {
        setSelectedCash(cash); // Обновляем выбранную валюту
        // Обновляем курс в зависимости от выбранной валюты
        let rate;
        // let rate: number | undefined;
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
        const useRate = rate !== undefined ? `1.00 ${selectedCoin} = ${rate} ${cash}` : '* refresh page to request data';
        setRatesCrypto(useRate); // Устанавливаем новый курс в состояние
        // setRatesCrypto(rate);
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

    const redirectToBuyPage = (wallet: { accounts: string[] }) => {
        if (wallet.accounts.length > 0) {
            const accountId = wallet.accounts[0];
            window.location.href = `https://portfolio.metamask.io/buy?metamaskEntry=ext_buy_sell_button&metametricsId=${accountId}`;
        }
    };

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
                    <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                        <Button fullWidth
                            variant={selectedCoin === 'BNB' ? 'outlined' : 'text'}
                            disableElevation
                            startIcon={<SiBinance fill='orange' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('BNB')
                                handleRatesClick((ratesInSelectedCash('BNB') !== undefined) ? `1.00 BNB = ${ratesInSelectedCash('BNB')} ${selectedCash}` : '* refresh page to request data')
                            }} >
                            BNB
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'ETH' ? 'outlined' : 'text'}
                            disableElevation
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('ETH')
                                handleRatesClick(ratesInSelectedCash('ETH') !== undefined ? `1.00 ETH = ${ratesInSelectedCash('ETH')} ${selectedCash}` : '* refresh page to request data')
                            }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'USDT' ? 'outlined' : 'text'}
                            disableElevation
                            startIcon={<SiTether fill='limeGreen' />}
                            disabled={isTestnet ? true : false}
                            onClick={() => {
                                handleCoinClick('USDT')
                                handleRatesClick(ratesInSelectedCash('USD') !== undefined ? `1.00 USDT = ${ratesInSelectedCash('USDT')} ${selectedCash}` : '* refresh page to request data')
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
                            autoComplete='off'
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedCoin ? ratesCrypto : ''}</Typography>
                    <Typography fontSize={10} >
                        source: <Link
                            underline="none"
                            color='cornflowerblue'
                            href='https://www.coingecko.com/ru'
                            target="_blank"
                            data-tooltip="Open in Block Explorer"
                            rel="noreferrer">
                            coingecko
                        </Link>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button sx={{ m: 2, width: '100px' }} color='warning'
                        variant="contained"
                        disabled={!inputValue}
                        onClick={() => { redirectToBuyPage(wallet) }}
                    >
                        Buy
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
                            color='success'
                            variant={selectedCash === 'USD' ? 'outlined' : 'text'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<HiMiniCurrencyDollar />}
                            disabled={isTestnet ? true : false}
                            onClick={() => handleCashClick('USD')}>
                            USD
                        </Button>
                        <Button fullWidth
                            color='success'
                            variant={selectedCash === 'EUR' ? 'outlined' : 'text'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<HiMiniCurrencyEuro />}
                            disabled={isTestnet ? true : false}
                            onClick={() => { handleCashClick('EUR') }}>
                            EUR
                        </Button>
                        <Button fullWidth
                            color='success'
                            variant={selectedCash === 'RUB' ? 'outlined' : 'text'}
                            // disabled={selectedCoin ? false : true}
                            startIcon={<PiCurrencyRubFill />}
                            disabled={isTestnet ? true : false}
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
            {ratesCrypto === '* refresh page to request data' && (<Typography variant='button' sx={{gridColumn: 'span 3', color: 'red', px: 2, textAlign: 'left'}}>
                * The app uses a free API, so try refreshing the page or wait a bit.
            </Typography>)}
            
        </Box>
    )
}
