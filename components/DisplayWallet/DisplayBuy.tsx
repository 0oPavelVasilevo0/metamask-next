'use client'
import { Button, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import CoinButtons from '../Buttons/CoinButtons';
import SelectCoins from '../Select/SelectCoins';
import SelectMoney from '../Select/SelectMoney';
import { RiExchangeLine } from 'react-icons/ri';
import MoneyButtons from '../Buttons/MoneyButtons';
import { PiCurrencyBtcFill } from 'react-icons/pi';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { useMetaMask } from '@/hooks/useMetaMask';

const currencies = [

    {
        value: 'ETH',
        label: 'ETH',
    },
    {
        value: 'BTC',
        label: 'BTC',
    },
];

const NoBorderTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
});

export default function DisplayBuy() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { wallet } = useMetaMask()

    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
    };

    return (
        <Box sx={
            {
                display: isSmallScreen ? 'flex' : 'grid',
                flexDirection: isSmallScreen ? 'column' : undefined,
                gridTemplateColumns: isSmallScreen ? undefined : '34ch 8ch 34ch',
                justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
            }
        }
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
                    <FormControl fullWidth sx={{ m: 2 }}>
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
                <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Exchange</Button>
            </Box>
            <Box sx={{ m: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <RiExchangeLine style={{ width: '68', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <MoneyButtons />
                <SelectMoney />
            </Box>
        </Box>
    )
}
