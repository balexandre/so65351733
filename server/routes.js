// #######################################################################
// routes.js

const router = require('express').Router();
const {
  getStoryById, getAllStories, getEventsByStoryId, addStory, addEventToStoryId,
} = require('./engine');

// so we catch promise errors correctly and send as an error message
const wrapWithTryCatch = async (res, fn) => {
  try {
    res.json(await fn());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

router.get('/', (req, res) => res.json({ message: 'All working...' }));

router.get('/stories', async (req, res) => wrapWithTryCatch(res, () => getAllStories(req.query)));
router.post('/stories', async (req, res) => wrapWithTryCatch(res, () => addStory(req.body)));

router.get('/stories/:id', async (req, res) => wrapWithTryCatch(res, () => getStoryById(req.params.id)));
router.get('/stories/:id/events', async (req, res) => wrapWithTryCatch(res, () => getEventsByStoryId(req.params.id)));
router.post('/stories/:id/events', async (req, res) => wrapWithTryCatch(res, () => addEventToStoryId(req.params.id, req.body)));

module.exports = router;
