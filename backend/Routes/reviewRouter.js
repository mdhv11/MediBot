import express from 'express';
const router = express.Router();
import Review from '../models/ReviewSchema.js';


// Route to get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching reviews.' });
  }
});

// Route to create a new review
router.post('/', async (req, res) => {
  try {
    const { doctorId, userId, reviewText, rating } = req.body;
    const review = new Review({ doctor: doctorId, user: userId, reviewText, rating });
    await review.save();
    res.json({ success: true, message: 'Review created successfully!', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the review.' });
  }
});

export default router;
