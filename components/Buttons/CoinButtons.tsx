'use client'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { PiCurrencyBtcFill } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { Box } from '@mui/material';


export default function CoinButtons() {
    return (
        <Box sx={{ m:2}}>
        <Stack direction="row" spacing={3}>
            <Button variant="outlined" startIcon={<PiCurrencyBtcFill />} >
                BTC
            </Button>
                <Button variant="outlined" startIcon={<FaEthereum />} >
                ETH
            </Button>
                <Button variant="outlined" startIcon={<SiTether />} >
                USDT
            </Button>
        </Stack>
        </Box>
    );
}