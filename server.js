const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({ origin: '*', methods: ['POST', 'GET'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// API Route
app.post('/api/search', (req, res) => {
    let { domain } = req.body;
    
    if (!domain) {
        return res.status(400).json({ error: "No domain provided" });
    }

    if (!domain.includes('.')) {
        domain = domain + '.com';
    }

    dns.resolve(domain, (err) => {
        if (!err) {
            res.json({ 
                available: false, 
                message: `Sorry! The domain "${domain}" is already TAKEN.` 
            });
        } else {
            res.json({ 
                available: true, 
                message: `Congratulations! "${domain}" is AVAILABLE!` 
            });
        }
    });
});

// Usa lang ka app.listen!
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});