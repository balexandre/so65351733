// #######################################################################
// engines > stories.js

const { Story } = require('../models');

const getAllStories = async ({ skip = 0, limit = 10 }) => Story.find()
  .sort({ createdAt: -1 })
  .skip(parseInt(`${skip}`, 10))
  .limit(parseInt(`${limit}`, 10))
  .lean();

const getStoryById = async (id) => Story.findById(id);

const getEventsByStoryId = async (id) => (await Story.findById(id)).events || [];

const addStory = async (body) => Story.create(body);

const addEventToStoryId = async (id, evt) => Story.updateOne(
  { _id: id },
  { $push: { events: evt } },
);

module.exports = {
  getStoryById, getAllStories, getEventsByStoryId, addStory, addEventToStoryId,
};
