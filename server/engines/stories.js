// #######################################################################
// engines > stories.js

const { Story } = require('../models');

const getAllStories = async ({ skip = 0, limit = 10 }) => Story.find()
  .sort({ createdAt: -1 })
  .skip(parseInt(`${skip}`, 10))
  .limit(parseInt(`${limit}`, 10))
  .lean();

const getStoryById = async (id) => Story.findById(id);

const addStory = async (body) => Story.create(body);

const deleteStory = async (id) => Story.deleteOne({ _id: id });

const getEventsByStoryId = async (id) => (await Story.findById(id)).events || [];

const addEventToStoryId = async (id, evt) => Story.updateOne(
  { _id: id },
  { $push: { events: evt } },
);

const deleteEventById = async (storyId, evtId) => Story.updateOne(
  { _id: storyId },
  { $pull: { events: { _id: evtId } } },
);

module.exports = {
  getStoryById,
  getAllStories,
  getEventsByStoryId,
  addStory,
  addEventToStoryId,
  deleteEventById,
  deleteStory,
};
