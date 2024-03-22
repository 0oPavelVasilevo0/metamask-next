'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CryptoData {
    binancecoin?: {
        usd?: number;
        eur?: number;
        rub?: number;
    };
    bitcoin?: {
        usd?: number;
        eur?: number;
        rub?: number;
    };
    ethereum?: {
        usd?: number;
        eur?: number;
        rub?: number;
    };
    tether?: {
        usd?: number;
        eur?: number;
        rub?: number;
    };
}

const useCryptoData = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum,tether&vs_currencies=usd,eur,rub');
                setCryptoData(response.data);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchData();
    }, []);

    return cryptoData;
};

export default useCryptoData;
