const express = require('express');
const router = express.Router({ mergeParams: true });

const { authUser } = require('../middleware/auth');
const { addOrUpdateReview, deleteReview } = require('../Controllers/reviewController');

router.post('/:bookId/review', authUser, addOrUpdateReview);
router.delete('/:bookId/review/:reviewId', authUser, deleteReview);

module.exports = router;
