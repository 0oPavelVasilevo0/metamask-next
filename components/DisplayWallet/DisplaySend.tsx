'use client'
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { CiRepeat } from 'react-icons/ci';
import { SiBinance } from "react-icons/si";
import useCryptoData from '@/hooks/useCryptoData';
import { useMetaMask } from '@/hooks/useMetaMask';
import { fromWei, toWei } from 'web3-utils';
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
                            variant={selectedCoin === 'BNB' ? 'contained' : 'outlined'}
                            startIcon={<SiBinance fill='orange' />}
                            onClick={() => {
                                handleCoinClick('BNB')
                            }}
                            disabled={true}
                        >
                            BNB
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                            startIcon={<FaEthereum fill='DodgerBlue' />}
                            onClick={() => {
                                handleCoinClick(isTestnet ? 'SepoliaETH' : 'ETH')
                            }}
                        >
                            ETH
                        </Button>
                        <Button fullWidth
                            variant={selectedCoin === 'USDT' ? 'contained' : 'outlined'}
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
                            onChange={(event) => setTransactionAmount(event.target.value)}
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
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, ml: 2, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={10} color='secondary'>{selectedCoin ? `1.00 ETH = ${ethereum?.usd} USD` : ''}</Typography>
                    <Typography fontSize={10} >source: <a href='https://www.coingecko.com/ru'>coingecko</a></Typography>
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
                <CiRepeat style={{ width: isSmallScreen ? '34' : '44', height: 'auto', transform: isSmallScreen ? 'rotate(90deg)' : 'none', fill:'grey'}} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ m: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <InputLabel sx={{ fontSize: '10px' }} size='small' htmlFor="outlined-adornment-amount">
                                gasPrice
                            </InputLabel>
                            <OutlinedInput
                                sx={{ fontSize: '14px' }}
                                size='small'
                                label="gasPrice"
                                // value={gasLimit}
                                // value={gasPrice}
                                // onChange={(event) => setGasLimit(event.target.value)}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <InputLabel sx={{ fontSize: '10px' }} size='small' htmlFor="outlined-adornment-amount">
                                Total Amount
                            </InputLabel>
                            <OutlinedInput
                                sx={{ fontSize: '14px' }}
                                size='small'
                                label="Total Amount"
                                // value={maxPriorityFeePerGas}
                                // value={totalAmount}
                                // onChange={(event) => setMaxPriorityFeePerGas(event.target.value)}
                                disabled={true}
                            />
                        </FormControl>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <FormControl fullWidth sx={{ m: 2, mt: 0, mb: 3 }}>
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
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}
