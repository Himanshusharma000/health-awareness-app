const express = require('express');
const { check, validationResult } = require('express-validator');
const Article = require('../models/Article');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

// GET /api/articles - Fetch all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/subscribe - Subscribe to newsletter
router.post(
  '/subscribe',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let subscriber = await Subscriber.findOne({ email });

      if (subscriber) {
        return res.status(400).json({ message: 'User already subscribed' });
      }

      subscriber = new Subscriber({ email });
      await subscriber.save();

      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/health-tips - Fetch daily health tips
router.get('/health-tips', (req, res) => {
  const tips = [
    "Drink at least 8 glasses of water a day.",
    "Aim for 30 minutes of physical activity most days.",
    "Eat a diet rich in fruits, vegetables, and whole grains.",
    "Get 7-9 hours of quality sleep each night.",
    "Practice mindfulness or meditation to reduce stress."
  ];
  const dailyTip = tips[Math.floor(Math.random() * tips.length)];
  res.json({ tip: dailyTip });
});

module.exports = router;
