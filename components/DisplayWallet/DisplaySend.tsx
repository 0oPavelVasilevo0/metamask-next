'use client'
import { Box, Button, FilledInput, FormControl, InputAdornment, InputLabel, Link, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';
import { SiBinance } from "react-icons/si";
import useCryptoData from '@/hooks/useCryptoData';
import { useMetaMask } from '@/hooks/useMetaMask';
import { MdClose, MdDone } from 'react-icons/md';


export default function DisplaySend() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const rotateAnimation = {
    //     animation: 'rotate 4s forwards',
    //     '@keyframes rotate': {
    //         '100%': {
    //             transform: 'rotate(90deg)'
    //         }
    //     }

    // };
    const { wallet } = useMetaMask()
    const { ethereum } = useCryptoData();
    const [selectedCoin, setSelectedCoin] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const isTestnet = wallet.ethChainId === '0xaa36a7'
    // const [gasLimit, setGasLimit] = useState('');
    // const [gasPrice, setGasPrice] = useState('');
    // const [totalAmount, setTotalAmount] = useState('');
    // const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState('');
    const handleCoinClick = (coin: React.SetStateAction<string>) => {
        setSelectedCoin(coin);
    };

    useEffect(() => {
        // Обновляем selectedCoin при изменении сети
        setSelectedCoin('');
    }, [isTestnet]);

    const useEth = ethereum !== undefined ? `1.00 ETH = ${ethereum?.usd} USD` : '* refresh page to request data';
    // // Функция для расчета gasLimit
    // const calculateGasLimit = (transactionAmount: any) => {
    //     // Ваша логика расчета gasLimit на основе введенной суммы
    //     // Здесь просто примерный расчет
    //     return transactionAmount ? '0x5028' : '0x0'; // Ваш расчет gasLimit
    // };

    // // Функция для расчета maxPriorityFeePerGas
    // const calculateMaxPriorityFeePerGas = (recipientAddress: any) => {
    //     // Ваша логика расчета maxPriorityFeePerGas на основе адреса получателя
    //     // Здесь просто примерный расчет
    //     return recipientAddress ? '0x3b9aca00' : '0x0'; // Ваш расчет maxPriorityFeePerGas
    // };

    //функция отправки транзакции
    const handleSendTransaction = async () => {
        if (!selectedCoin || !recipientAddress || !transactionAmount) return;

        try {

            // const weiAmount = toWei(transactionAmount, 'ether');

            const transactionParams = {
                from: wallet.accounts[0],
                to: recipientAddress,
                value: '0x0', // You need to set the value in wei
                // value: transactionAmount,
                // value: toWei(transactionAmount, 'ether'), // Convert ETH to Wei
                // value: weiAmount,
                // Customizable by the user during MetaMask confirmation.
                gasLimit: '0x5028',
                // gasLimit: gasLimit,
                // Customizable by the user during MetaMask confirmation.
                maxPriorityFeePerGas: '0x3b9aca00',
                // maxPriorityFeePerGas: maxPriorityFeePerGas,
                // Customizable by the user during MetaMask confirmation.
                maxFeePerGas: '0x2540be400',
            };

            // const estimatedGas = await window.ethereum.request({
            //     method: 'eth_estimateGas',
            //     params: [transactionParams],
            // });

            // const gasPrice = await window.ethereum.request({
            //     method: 'eth_gasPrice',
            // });

            // setGasPrice(gasPrice);
            // setTotalAmount((parseInt(estimatedGas) * parseInt(gasPrice) + parseInt(transactionAmount)).toString());

            // Set gas price and total amount
            // setGasPrice(gasPrice);
            // const totalAmountWei = BigInt(estimatedGas) * BigInt(gasPrice) + BigInt(weiAmount);
            // const totalAmountEth = fromWei(totalAmountWei.toString(), 'ether');
            // setTotalAmount(totalAmountEth);

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParams],
            });

            console.log('Transaction sent. Transaction hash:', txHash);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    };
    return (
        <Box sx={{
            display: isSmallScreen ? 'flex' : 'grid',
            flexDirection: isSmallScreen ? 'column' : undefined,
            gridTemplateColumns: isSmallScreen ? undefined : '34ch 5ch 34ch',
            justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
        }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button fullWidth
                            variant={selectedCoin === 'BNB' ? 'outlined' : 'text'}
                            startIcon={<SiBinance fill='orange' />}
                            onClick={() => {
                                handleCoinClick('BNB')
                            }}
                            disabled={true}
                        >
                            BNB
                        </Button>
                        <Button fullWidth
                            variant={(!selectedCoin ? 'text' : 'outlined')}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleCoinClick(isTestnet ? 'SepoliaETH' : 'ETH')
                            }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'USDT' ? 'outlined' : 'text'}
                            startIcon={<SiTether fill='limeGreen' />}
                            onClick={() => {
                                handleCoinClick('USDT')
                            }}
                            disabled={true}
                        >
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
                                        selectedCoin === 'SepoliaETH' ? wallet.ethBalance :
                                            'chooce coin'
                            }
                        </InputLabel>
                        <OutlinedInput
                            value={transactionAmount}
                            onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value)) {setTransactionAmount(e.target.value)}}}
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="end">
                                <Typography
                                    color={
                                        selectedCoin === 'BNB' ? 'orange' :
                                            selectedCoin === 'ETH' ? 'DodgerBlue' :
                                                selectedCoin === 'USDT' ? 'lightGreen' : 'error'}>
                                    {selectedCoin}
                                </Typography>
                            </InputAdornment>}
                            label="balance: 00000"
                            disabled={selectedCoin ? false : true}  // Обновляем disabled в зависимости от выбранной монеты
                            color='warning'
                            autoComplete='off'
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedCoin ? useEth : ''}</Typography>
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
                <Button sx={{ m: 2, width: '100px' }} color='warning'
                    variant='contained'
                    disabled={!selectedCoin || recipientAddress.length !== 42}
                    onClick={handleSendTransaction}
                >
                    Send
                </Button>
            </Box>
            <Box sx={{ mb: isSmallScreen ? 0 : 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
                <CiRepeat style={{ width: isSmallScreen ? '34' : '44', height: 'auto', transform: isSmallScreen ? 'rotate(90deg)' : 'none', fill: 'grey' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={0}>
                        <FormControl fullWidth sx={{ m: 0 }}>
                            <InputLabel sx={{ fontSize: '10px' }} size='small' htmlFor="outlined-adornment-amount">
                                gasPrice
                            </InputLabel>
                            <FilledInput
                                sx={{ fontSize: '14px', borderRadius: '4px 0 0 4px', height: '4.5ch' }}
                                size='small'
                                // label="gasPrice"
                                // value={gasLimit}
                                // value={gasPrice}
                                // onChange={(event) => setGasLimit(event.target.value)}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 0 }}>
                            <InputLabel sx={{ fontSize: '10px' }} size='small' htmlFor="outlined-adornment-amount">
                                Total Amount
                            </InputLabel>
                            <FilledInput
                                sx={{ fontSize: '14px', border: '0 0 0 0', borderRadius: ' 0 4px 4px 0', height: '4.5ch' }}
                                size='small'
                                // label="Total Amount"
                                // value={maxPriorityFeePerGas}
                                // value={totalAmount}
                                // onChange={(event) => setMaxPriorityFeePerGas(event.target.value)}
                                disabled={true}
                            />
                        </FormControl>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <FormControl fullWidth sx={{ m: 2, mt: 0 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                            {recipientAddress.length === 42 ? 'correct address entered' : recipientAddress.length === 0 ? 'enter address recipient' : 'invalid address entered'}
                        </InputLabel>
                        <OutlinedInput
                            id="public address"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    {recipientAddress.length === 42 ?
                                        <MdDone size={22} fill='limeGreen' />
                                        : recipientAddress.length === 0 ? null
                                            : <MdClose onClick={() => setRecipientAddress('')} cursor='pointer' size={22} fill='coral' />}
                                </InputAdornment>
                            }
                            // label="enter address recipient"
                            label={recipientAddress.length === 42 ? 'correct address entered' : recipientAddress.length === 0 ? 'enter address recipient' : 'invalid address entered'}
                            disabled={(selectedCoin ? false : true)}
                            autoComplete='off'
                        />
                    </FormControl>
                </Box>
            </Box>
            {ethereum === undefined && (<Typography variant='button' sx={{ gridColumn: 'span 3', color: 'red', px: 2, textAlign: 'left' }}>
                * The app uses a free API, so try refreshing the page or wait a bit.
            </Typography>)}
        </Box>
    )
}
