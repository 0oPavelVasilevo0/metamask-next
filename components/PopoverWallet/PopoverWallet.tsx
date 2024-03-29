'use client'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useMetaMask } from '@/hooks/useMetaMask';
import { formatAddress } from '@/utils';
import { Box, FilledInput, InputAdornment, OutlinedInput, Stack, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { PiCopyLight } from 'react-icons/pi';
import { RxExternalLink } from 'react-icons/rx';
import { IoCopyOutline } from 'react-icons/io5';

export default function PopoverWallet() {
    const { wallet, switchChain, addChain } = useMetaMask()
    const isTestnet = wallet.ethChainId === '0xaa36a7'
    // const { switchChain } = useMetaMask(); // Д

    // Обработчик события для переключения на mainnet
    const handleMainnetClick = async () => {
        await switchChain(1); // Mainnet chainId
    };
    // Обработчик события для переключения на testnet(Sepolia)
    const handleSepoliaTestnetClick = async () => {
        await switchChain(11155111)
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // const handleLinkClick = (url: string | URL | undefined) => {
    //     window.open(url, '_blank');
    // };
    // Переключение на Sepolia testnet
    // const switchToSepoliaTestnet = async () => {
    //     try {
    //         // Добавляем цепочку Sepolia testnet
    //         await addChain(
    //             11155111, // Идентификатор цепочки Sepolia testnet
    //             'Sepolia Testnet', // Имя цепочки
    //             ['https://sepolia.drpc.org'] // URL-адреса RPC
    //         );

    //         // Переключаемся на Sepolia testnet
    //         await switchChain(11155111);
    //     } catch (error) {
    //         console.error("Error switching to Sepolia testnet:", error);
    //     }
    // };


    // Вызываем функцию для переключения на Sepolia testnet
    // switchToSepoliaTestnet();

    // const switchToMainnet = async () => {
    //     // Переключение на главную сеть (mainnet)
    //     try {
    //         await window.ethereum.request({
    //             method: "wallet_switchEthereumChain",
    //             params: [{ chainId: "0x1" }], // Mainnet chainId
    //         });
    //     } catch (error) {
    //         console.error("Error switching to mainnet:", error);
    //     }
    // };

    // const switchToTestnet = async () => {
    //     // Переключение на тестовую сеть (testnet)
    //     try {
    //         await window.ethereum.request({
    //             method: "wallet_switchEthereumChain",
    //             params: [{ chainId: "0x4" }], // Rinkeby testnet chainId
    //         });
    //     } catch (error) {
    //         console.error("Error switching to testnet:", error);
    //     }
    // };

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState: any) => (
                <Box>
                    <Button
                        sx={{ flexDirection: 'row', background: '#c8c8c841' }}
                        endIcon={<MdArrowDropDown style={{width: '24', height: 'auto', alignItems: 'center'}} />}
                        {...bindTrigger(popupState)}>
                        Metamask
                        {isTestnet &&
                            <Typography color={'orangeRed'} fontSize={12} sx={{ textShadow: 'black 1px 0 10px' }} fontWeight={'bold'} pt={0.4} fontFamily={'fantasy'}  >
                                Testnet
                            </Typography>
                        }Wallet
                    </Button>
                    {/* {isTestnet &&
                        <Typography color={'error'} fontSize={14} textAlign={'center'} >
                            Testnet
                        </Typography>
                    } */}
                    <Popover sx={{ textAlign: 'end' }}
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {/* <Typography sx={{ p: 1 }}>{wallet.accounts[0]}</Typography> */}

                        <FilledInput
                            fullWidth
                            size='small'
                            sx={{ fontSize: '12px', p: 0 }}
                            readOnly
                            defaultValue={wallet.accounts[0]}
                            endAdornment={
                                // <>
                                //     <Tooltip title="Copy" placement="top-start">
                                <InputAdornment sx={{ cursor: 'pointer' }} position='end'>
                                    <IoCopyOutline
                                        style={{ width: '23', height: 'auto', cursor: 'pointer', marginRight: '8' }}
                                        onClick={() => handleCopy(wallet.accounts[0])}
                                    />
                                    {/* </InputAdornment>
                                    </Tooltip>
                                    <Tooltip title="Go to etherscan" arrow>
                                        <InputAdornment position='end'> */}
                                    <a
                                        className="text_link"
                                        href={`https://etherscan.io/address/${wallet}`}
                                        target="_blank"
                                        data-tooltip="Open in Block Explorer" rel="noreferrer">
                                        <RxExternalLink
                                            style={{ width: '26', height: 'auto', cursor: 'pointer', marginRight: '4' }}
                                        // onClick={() => handleLinkClick(`https://etherscan.io/address/${wallet}`)}
                                        >
                                        </RxExternalLink>
                                    </a>
                                </InputAdornment>
                                //     </Tooltip>
                                // </>
                            }
                        />
                        {/* <Typography sx={{ p: 1 }}>
                            <a
                                // className="text_link"
                                href={`https://etherscan.io/address/${wallet}`}
                                target="_blank"
                                data-tooltip="Open in Block Explorer" rel="noreferrer"
                            >
                                {formatAddress(wallet.accounts[0])}
                                Go to etherscan
                            </a>
                        </Typography> */}
                        <Typography sx={{ p: 1 }}>ETH: {wallet.ethBalance}</Typography>
                        <Typography sx={{ p: 1 }}>BNB: {wallet.bnbBalance}</Typography>
                        {/* Кнопки для переключения между сетями */}
                        <Stack m={1} direction="row" spacing={1}>
                            <Button fullWidth size='medium' sx={{ fontSize: '10px' }} variant={isTestnet ? 'outlined' : 'contained'} onClick={handleMainnetClick}>Mainnet</Button>
                            <Button fullWidth size='medium' sx={{ fontSize: '10px' }} variant={isTestnet ? 'contained' : 'outlined'} onClick={handleSepoliaTestnetClick}>Testnet(Sepolia)</Button>
                        </Stack>
                    </Popover>
                </Box>
            )
            }
        </PopupState >
    );
}