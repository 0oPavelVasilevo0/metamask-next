import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Input, InputAdornment, InputLabel, OutlinedInput, Select, styled } from '@mui/material';

const currencies = [

    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
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
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl fullWidth sx={{ m: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    endAdornment={<InputAdornment position="end">USD</InputAdornment>}
                    label="Amount"
                />
            </FormControl>
        </Box>
    );
}