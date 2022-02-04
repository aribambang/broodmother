import express from 'express';
import { createSubscription, prices, subscriptions, subscriptionStatus } from '../controllers/subs';
import { requireSignIn } from '../middlewares';

const router = express.Router();

router.get('/prices', prices);
router.post('/create-subscription', requireSignIn, createSubscription);
router.get('/subscription-status', requireSignIn, subscriptionStatus);
router.get('/subscriptions', requireSignIn, subscriptions);

module.exports = router;
