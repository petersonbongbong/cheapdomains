const express = require('express');
const cors = require('cors');
const dns = require('dns'); // <--- Kini ang module nga mo-tsek sa tinuod nga internet
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/search', (req, res) => {
    let { domain } = req.body;
    console.log(`Legit checking para sa: ${domain}`);

    if (!domain) {
        return res.status(400).json({ error: "No domain provided" });
    }

    // Siguroha nga naay extension sama sa .com kung ngalan ra ang gi-type sa buyer
    if (!domain.includes('.')) {
        domain = domain + '.com';
    }

    // I-lookup sa internet kung nag-andar ba ang IP sa maong domain
    dns.resolve(domain, (err) => {
        if (!err) {
            // KUNG WALAY ERROR: Pasabot nag-andar ang site sa internet (TAKEN NA SYA)
            res.json({ 
                available: false, 
                message: `Sorry! The domain "${domain}" is already TAKEN. Please try another name.` 
            });
        } else {
            // KUNG NAAY ERROR (ENOTFOUND): Pasabot walay nakitang IP, libre pa ug pwedeng mapalit!
            res.json({ 
                available: true, 
                message: `Congratulations! "${domain}" is AVAILABLE! You can purchase it instantly via Crypto.` 
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Yehey! Ang Node.js backend nagdagan na sa http://localhost:${PORT}`);
});