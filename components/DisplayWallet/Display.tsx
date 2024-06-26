'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMetaMask } from '@/hooks/useMetaMask';
import { Paper, useMediaQuery } from '@mui/material';
import DisplayBuy from './DisplayBuy';
import DisplayExchange from './DisplayExchange';
import { MetaMaskError } from '../Error/MetaMaskError';
import { customTheme } from '../theme/theme';
//https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
import dynamic from 'next/dynamic'
import DisplaySend from './DisplaySend';
import { ThemeContextProvider } from '../theme/ThemeContext';
const WalletNav = dynamic(() => import('../WalletNavigation/WalletNavigation'), { ssr: false })

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

    const { wallet, hasProvider } = useMetaMask()

    const [value, setValue] = useState(0);

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const usePaper = !(hasProvider && wallet.accounts.length > 0) || !isSmallScreen;

    return (
        <Box component={(usePaper) ? Paper : 'div'} elevation={(usePaper) ? 6 : 0}
                sx={{
                    minHeight: isSmallScreen ? '100vh' : undefined,
                    width: isSmallScreen ? '100vw' : undefined,
                    //// border: !(hasProvider && wallet.accounts.length > 0) ||  isSmallScreen ? 0 : 0.5,
                    justifyContent: isSmallScreen ? 'center' : undefined,
                    // background: (hasProvider && wallet.accounts.length > 0) ? '#FFFFFF' : 'rgb(38, 38, 38)',
                }}
            >
                {/* <WalletNavigation /> */}
                <WalletNav />
                {wallet.accounts.length > 0 &&
                    <>
                        <Box sx={{ m: isExtraSmallScreen ? 0.5 : 2, borderBottom: 0, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab sx={{ p: isSmallScreen ? 1 : 2, m: isSmallScreen ? 'auto' : '0' }} label="Fast buy" {...a11yProps(0)} />
                                <Tab sx={{ p: isSmallScreen ? 1 : 2, m: isSmallScreen ? 'auto' : '0' }} label="Fast exchange" {...a11yProps(1)} />
                                <Tab sx={{ p: isSmallScreen ? 1 : 2, m: isSmallScreen ? 'auto' : '0' }} label="Fast send" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <DisplayBuy />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <DisplayExchange />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <DisplaySend />
                        </CustomTabPanel>
                    </>
                }
                <MetaMaskError />
            </Box>
    );
}
