// #######################################################################
// models > Story.js

const mongoose = require('mongoose');

const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['Point', 'LineString', 'Polygon'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const EventSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    minlength: 3,
  },
  imageUrl: {
    type: String,
  },
  link: {
    type: String,
  },
  audio: {
    type: String,
  },
  geo: GeoSchema,
});

const StorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      required: true,
    },
    summary: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    toryStatus: {
      type: String,
      default: 'public',
      enum: ['public', 'private'],
    },
    creator: {
      type: mongoose.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
    references: [String],
    tags: [String],
    mapStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/light-v9',
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    events: [EventSchema],
  },
  { timestamps: true },
);

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
