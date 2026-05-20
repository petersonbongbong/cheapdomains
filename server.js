const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();
const PORT = process.env.PORT || 3000;

// Gitugotan niini nga makakonektar ang imong Netlify site
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});