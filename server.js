const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();
const PORT = process.env.PORT || 10000;

const axios = require('axios'); // I-install ni pinaagi sa 'npm install axios' sa imong terminal

app.post('/api/search', async (req, res) => {
    let { domain } = req.body;
    if (!domain) return res.status(400).json({ error: "No domain provided" });
    if (!domain.includes('.')) domain = domain + '.com';

    try {
        // Gigamit nato ang Google DNS API imbes nga local dns.resolve
        const response = await axios.get(`https://dns.google/resolve?name=${domain}`);
        
        if (response.data.Answer) {
            res.json({ available: false, message: `Sorry! The domain "${domain}" is already TAKEN.` });
        } else {
            res.json({ available: true, message: `Congratulations! "${domain}" is AVAILABLE!` });
        }
    } catch (error) {
        // Kung naay error, pasabot wala pa ni record (available)
        res.json({ available: true, message: `Congratulations! "${domain}" is AVAILABLE!` });
    }
});

// Usa lang ka app.listen!
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});