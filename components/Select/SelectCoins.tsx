'use client'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, styled } from '@mui/material';
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

export default function SelectCoins() {

    const { wallet } = useMetaMask()


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">balance: {wallet.ethBalance}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    endAdornment={<InputAdornment position="end">coin</InputAdornment>}
                    label="balance: 0.000"
                />
            </FormControl>
        </Box>
    );
}