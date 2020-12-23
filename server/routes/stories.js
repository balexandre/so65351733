// #######################################################################
// routes > stories.js

const router = require('express').Router();
const { stories } = require('../engines');
const { deleteStory, deleteEventById } = require('../engines/stories');

const {
  getStoryById, getAllStories, getEventsByStoryId, addStory, addEventToStoryId,
} = stories;

// so we catch promise errors correctly and send as an error message
const wrapWithTryCatch = async (res, fn) => {
  try {
    res.json(await fn());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

router.get('/', async (req, res) => wrapWithTryCatch(res, () => getAllStories(req.query)));
router.post('/', async (req, res) => wrapWithTryCatch(res, () => addStory(req.body)));

router.get('/:id', async (req, res) => wrapWithTryCatch(res, () => getStoryById(req.params.id)));
router.delete('/:id', async (req, res) => wrapWithTryCatch(res, () => deleteStory(req.params.id)));

router.get('/:id/events', async (req, res) => wrapWithTryCatch(res, () => getEventsByStoryId(req.params.id)));
router.post('/:id/events', async (req, res) => wrapWithTryCatch(res, () => addEventToStoryId(req.params.id, req.body)));
router.delete('/:id/events/:evtId', async (req, res) => wrapWithTryCatch(res, () => deleteEventById(req.params.id, req.params.evtId)));

module.exports = router;
