'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMetaMask } from '@/hooks/useMetaMask';
import SelectCoins from '../Select/SelectCoins';
import SelectMoney from '../Select/SelectMoney';
import CoinButtons from '../Buttons/CoinButtons';
import MoneyButtons from '../Buttons/MoneyButtons';
import { RiExchangeLine } from "react-icons/ri";
import WalletNavigation from '../WalletNavigation/WalletNavigation';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DisplayBuy from './DisplayBuy';
import DisplayExchange from './DisplayExchange';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Display() {

    const { wallet } = useMetaMask()

    const [value, setValue] = useState(0);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            border: '2px solid black',
            borderRadius: '8px'
        }} >
            <WalletNavigation />
            {wallet.accounts.length > 0 &&
                <>
                    <Box sx={{ m: 2, borderBottom: 0, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Fast buy" {...a11yProps(0)} />
                            <Tab label="Fast exchange" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <DisplayBuy />
                        {/* <Box
                            sx={{
                                display: isSmallScreen ? 'flex' : 'grid',
                                flexDirection: isSmallScreen ? 'column' : undefined,
                                gridTemplateColumns: isSmallScreen ? undefined : '34ch 8ch 34ch',
                                justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CoinButtons />
                                <SelectCoins />
                                <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Exchenge</Button>
                            </Box>
                            <Box sx={{ m: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                                <RiExchangeLine style={{ width: '68', height: 'auto' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <MoneyButtons />
                                <SelectMoney />
                            </Box>
                        </Box> */}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <DisplayExchange />
                        {/* <Box sx={{
                            display: isSmallScreen ? 'flex' : 'grid',
                            flexDirection: isSmallScreen ? 'column' : undefined,
                            gridTemplateColumns: isSmallScreen ? undefined : '34ch 8ch 34ch',
                            justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
                        }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <MoneyButtons />
                                <SelectMoney />
                                <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Exchenge</Button>
                            </Box>
                            <Box sx={{ m: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                                <RiExchangeLine style={{ width: '68', height: 'auto' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <MoneyButtons />
                                <SelectMoney />
                            </Box>
                        </Box> */}
                    </CustomTabPanel>
                </>
            }
        </Box>
    );
}
