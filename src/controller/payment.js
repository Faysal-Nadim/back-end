const rp = require('request-promise');

exports.getToken = async(req, res) => {
    const options = {
        method: 'POST',
        url: `${process.env.BKASH_URL}/checkout/token/grant`,
        headers: {
            password: `${process.env.BKASH_PASSWORD}`,
            username: `${process.env.BKASH_USERNAME}`
        },
        json: { app_key: `${process.env.BKASH_APP_KEY}`, app_secret: `${process.env.BKASH_APP_SECRET}` }
    }
    const tokenObj = await rp(options);
    return tokenObj.id_token;
}

exports.createPayment = async (req, res) => {
    const reqBody = req.body;
    const token = req.body;

    const options = {
        method: 'POST',
        url: `${process.env.BKASH_URL}/checkout/payment/create`,
        headers: {
            'x-app-key': `${process.env.BKASH_APP_KEY}`,
            authorization: token
        },
        json: { amount: '50', intent: 'sale', currency: 'BDT' }
    }

    const body = await rp(options);
    return res.status(200).json({ body, token });
}

exports.executePayment = async (req, res) => {
    const paymentID = req.body.paymentID;
    const token = await getToken();
    const options = {
        method: 'POST',
        url: `${process.env.BKASH_URL}/checkout/payment/execute/${paymentID}`,
        headers: {
            'x-app-key': `${process.env.BKASH_APP_KEY}`,
            authorization: token
        }
    };

    const body = await rp(options);
    return res.status(201).json({ body });
}