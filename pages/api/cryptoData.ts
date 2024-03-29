import axios from 'axios';

export default async function handler(_req: any, res: any) {
    try {
        // const apiUrl = process.env.NEXT_APP_API_URL
        // if (!apiUrl) {
        //     console.error('API URL is not defined');
        //     return;
        // }
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum,tether&vs_currencies=usd,eur,rub');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}