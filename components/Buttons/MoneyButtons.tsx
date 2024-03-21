'use client'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiMiniCurrencyEuro } from "react-icons/hi2";
import { PiCurrencyRubFill } from "react-icons/pi";
import { Box } from '@mui/material';

export default function MoneyButtons() {
    return (
        <Box sx={{ m: 2 }}>
            <Stack direction="row" spacing={3}>
                <Button variant="outlined" startIcon={<HiMiniCurrencyDollar />}>
                    USD
                </Button>
                <Button variant="outlined" startIcon={<HiMiniCurrencyEuro />}>
                    EUR
                </Button>
                <Button variant="outlined" startIcon={<PiCurrencyRubFill />}>
                    RUB
                </Button>
            </Stack>
        </Box>
    );
}