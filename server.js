const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

// 1. KINI ANG IMPORTANTE NGA WALA SA IMONG CODE KARON
app.use(cors({ origin: '*', methods: ['POST', 'GET', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// 2. API Route
app.post('/api/search', async (req, res) => {
    let { domain } = req.body;
    if (!domain) return res.status(400).json({ error: "No domain provided" });
    if (!domain.includes('.')) domain = domain + '.com';

    try {
        const response = await axios.get(`https://dns.google/resolve?name=${domain}`);
        if (response.data.Answer) {
            res.json({ available: false, message: `Sorry! The domain "${domain}" is already TAKEN.` });
        } else {
            res.json({ available: true, message: `Congratulations! "${domain}" is AVAILABLE!` });
        }
    } catch (error) {
        res.json({ available: true, message: `Congratulations! "${domain}" is AVAILABLE!` });
    }
});

// 3. Listen
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});