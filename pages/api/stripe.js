const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log(req.body)
  if (req.method === 'POST') {
    try {
        const params = {
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipp_option:[
                {shipping_rate:'shr_1MKDipIyqut2FSZpl7yht8vw'},
                {shipping_rate:'shr_1MKDkLIyqut2FSZp79PuvHny'}
            ],
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}