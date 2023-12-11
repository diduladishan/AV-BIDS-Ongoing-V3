const { getUserByEmail } = require('../models/user/user.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
  appInfo: {
    // For sample support and debugging, not required for production:
    name: 'stripe-samples/subscription-use-cases/fixed-price',
    version: '0.0.1',
    url: 'https://github.com/stripe-samples/subscription-use-cases/fixed-price',
  },
});

/* 
?@desc   Get config
*@route  Get /api/stripe/config
*@access Private
*/

const getConfig = async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: ['annual', 'monthly'],
    expand: ['data.product'],
  });

  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    prices: prices.data,
  });
};

/* 
?@desc   Create stripe customer
*@route  Post /api/stripe/create-customer
*@access Private
*/

const createCustomer = async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
  });

  // Find the user in the database by email
  const user = await getUserByEmail(email);

  // Update the user's subscription field with the customer id
  if (user) {
    user.subscription.customerId = customer.id;
    await user.save();
  }

  res.send({ customer: customer });
};

/* 
?@desc   Create stripe subscription
*@route  Post /api/stripe/create-subscription
*@access Private
*/

const createSubscription = async (req, res) => {
  const { priceId, email } = req.body;

  try {
    // Find the user in the database by email
    const user = await getUserByEmail(email);

    // Create the subscription
    console.log(user);
    const subscription = await stripe.subscriptions.create({
      customer: user.subscription.customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    if (user) {
      user.subscription.subscriptionId = subscription.id;
      await user.save();
    }

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   Create stripe subscription
*@route  Get /api/stripe/retrieve-subscription
*@access Private
*/

const retrieveSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.query;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    res.status(200).json(subscription);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   Retrieve a customer
*@route  Get /api/stripe/retrieve-customer
*@access Private
*/

const retrieveCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await stripe.customers.retrieve(id);
    res.status(200).json(customer);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   update a customer
*@route  Put /api/stripe/retrieve-customer
*@access Private
*/

const updateStripeCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, name } = req.body;
    console.log(id);
    const customer = await stripe.customers.update(id, {
      address,
      name,
    });
    res.status(200).json(customer);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   Create a new card
*@route  Put /api/stripe/create-card
*@access Private
*/

const createCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { source } = req.body;
    console.log(id);
    // const card = await stripe.customers.createSource(id, {
    //   source
    // });
    const card = await stripe.customers.createSource(id, {
      source: 'tok_visa',
    });
    res.status(200).json(card);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   Delete a card
*@route  Get /api/stripe/delete-card/:id
*@access Private
*/

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const customerSource = await stripe.customers.deleteSource(id);
    res.status(200).json(customerSource);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

/* 
?@desc   Create a Customer Portal
*@route  POST /api/stripe/portal
*@access Private
*/

const createCustomerPortal = async (req, res) => {
  try {
    const { customerId } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'http://localhost:3000/billing',
    });
    res.status(200).json(session);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

module.exports = {
  getConfig,
  createCustomer,
  createSubscription,
  retrieveSubscription,
  retrieveCustomer,
  updateStripeCustomer,
  createCard,
  deleteCard,
  createCustomerPortal,
};
