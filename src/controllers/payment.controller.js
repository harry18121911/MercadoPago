import mercadopago from 'mercadopago';
import { HOST, MERCADOPAGO_TOKEN } from '../routes/config.js';

export const createOrder = async (req, res) => {
    
    mercadopago.configure({
        access_token: MERCADOPAGO_TOKEN,

    })
    const result = await mercadopago.preferences.create({
        items:[
            {
                title:"Laptop Lenovo",
                unit_price: 5,
                currency_id: "ARS",
                quantity:1,
            }
        ],
        back_urls:{
            success: `${HOST}/success`,
            failure: `${HOST}/failure`,
            pending: `${HOST}/pending`,
        },
        notification_url: "https://45a1-2803-9800-94c0-7489-548d-7726-1df2-8b58.ngrok-free.app/webhook"

    })
   
    console.log(result)
    res.send(result.body);
};

export const receiveWebhook = async (req,res) =>{

    console.log(req.query)
    const payment = req.query
    try {
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['data.id'])}
            console.log(data)
    
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message})
    }
}
