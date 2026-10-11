const express = require('express');
const { check, validationResult } = require('express-validator');
const Article = require('../models/Article');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

// GET /api/health - lightweight service health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'health-awareness-api' });
});

// GET /api/articles - Fetch all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Article fetch error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/subscribe - Subscribe to newsletter
router.post(
  '/subscribe',
  [check('email', 'Please include a valid email').isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber) {
        return res.status(409).json({ message: 'User already subscribed' });
      }

      await Subscriber.create({ email });
      return res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Subscription error:', error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/health-tips - Fetch a daily health tip
router.get('/health-tips', (req, res) => {
  const tips = [
    'Drink enough water throughout the day.',
    'Aim for regular physical activity most days.',
    'Eat a varied diet rich in fruits, vegetables and whole grains.',
    'Aim for 7-9 hours of quality sleep each night.',
    'Use healthy stress-management practices such as mindfulness or relaxation.',
  ];

  const dailyTip = tips[Math.floor(Math.random() * tips.length)];
  res.json({ tip: dailyTip });
});

module.exports = router;
