'use client'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useMetaMask } from '@/hooks/useMetaMask';
import { formatAddress } from '@/utils';
import { Box, Link, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
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

    const [copied, setCopied] = useState(false);
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true); // Устанавливаем состояние "copied" в true при нажатии на элемент
        setTimeout(() => {
            setCopied(false); // Сбрасываем состояние "copied" обратно в false через 1 секунду
        }, 1000)
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
                        sx={{ flexDirection: 'row' }}
                        endIcon={ !popupState.isOpen ? <MdArrowDropDown style={{ width: '24', height: 'auto' }} /> : <MdArrowDropUp style={{ width: '24', height: 'auto' }} />}
                        {...bindTrigger(popupState)}
                        >
                        Metamask
                        {isTestnet &&
                            <Typography color={'orangeRed'} fontSize={12} sx={{ textShadow: 'black 1px 0 10px' }} fontWeight={'bold'} pt={0.4} fontFamily={'fantasy'}  >
                                Testnet
                            </Typography>
                        }Wallet
                    </Button>
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
                        {/* <FilledInput
                            fullWidth
                            size='small'
                            sx={{ fontSize: '12px', p: 0, }}
                            readOnly
                            defaultValue={formatAddress(wallet.accounts[0])}
                            onClick={() => handleCopy(wallet.accounts[0])}
                            endAdornment={
                                <InputAdornment sx={{ cursor: 'pointer' }} position='end'>
                                    <a
                                        className="text_link"
                                        href={`https://etherscan.io/address/${wallet}`}
                                        target="_blank"
                                        data-tooltip="Open in Block Explorer" rel="noreferrer">
                                        <RxExternalLink
                                            style={{ width: '26', height: 'auto', cursor: 'pointer', marginRight: '4' }}
                                        >
                                        </RxExternalLink>
                                    </a>
                                </InputAdornment>
                              
                            }
                        /> */}
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
                        <Typography sx={{ p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: 0.5, alignItems: 'center' }}>
                            <Tooltip title='copy' arrow sx={{ cursor: 'pointer' }}>
                                <Typography color={copied ? 'limeGreen' : 'none'} mr={'auto'} ml={'auto'} onClick={() => handleCopy(wallet.accounts[0])}>
                                    {formatAddress(wallet.accounts[0])}
                                    <IoCopyOutline style={{ width: '16', height: 'auto', verticalAlign: 'middle' }} />
                                </Typography>
                            </Tooltip>
                            <Tooltip title='go to ethercsan' arrow >
                                <Link
                                    // color='info'
                                    underline="none"
                                    href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                                    target="_blank"
                                    data-tooltip="Open in Block Explorer"
                                    rel="noreferrer">
                                    <RxExternalLink style={{ width: '18', height: 'auto', cursor: 'pointer', verticalAlign: 'middle', color: 'cornflowerblue' }} />
                                </Link>
                            </Tooltip>
                        </Typography>
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