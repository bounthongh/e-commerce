const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/secret', async (req, res) => {
    const stripe = require('stripe')('sk_test_WbRG3f9IOSO99Wv1ryfUz3w500xMdbZQhu');
    const paymentIntent = await stripe.paymentIntents.create({
        amount:  `${req.query.amount}`,
        currency: 'eur',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
    res.json({client_secret: paymentIntent.client_secret});
});

app.listen(3002, () => {
    console.log('Running on port 3002');
});