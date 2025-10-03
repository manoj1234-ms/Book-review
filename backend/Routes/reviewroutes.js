const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/auth');
const { addOrUpdateReview, deleteReview } = require('../Controllers/reviewController');

router.post('/:bookId/review', auth, addOrUpdateReview);
router.delete('/:bookId/review/:reviewId', auth, deleteReview);

module.exports = router;
