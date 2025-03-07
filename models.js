// models/Info.js - Model for college information

const mongoose = require('mongoose');

// College Overview Schema
const OverviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: [{ type: String, required: true }],
  stats: [{
    number: { type: String, required: true },
    label: { type: String, required: true }
  }],
  accreditation: { type: String }
});

// Department Schema
const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Program Schema
const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String, enum: ['Undergraduate', 'Graduate', 'Doctoral', 'Certificate'], required: true },
  description: { type: String }
});

// Faculty Schema
const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  education: { type: String, required: true },
  imgUrl: { type: String, default: '/api/placeholder/120/120' }
});

// Timeline Event Schema
const TimelineEventSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  description: { type: String, required: true }
});

// FAQ Schema
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Export models
const Overview = mongoose.model('Overview', OverviewSchema);
const Department = mongoose.model('Department', DepartmentSchema);
const Program = mongoose.model('Program', ProgramSchema);
const Faculty = mongoose.model('Faculty', FacultySchema);
const TimelineEvent = mongoose.model('TimelineEvent', TimelineEventSchema);
const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = {
  Overview,
  Department,
  Program,
  Faculty,
  TimelineEvent,
  FAQ
};

// models/Map.js - Model for campus map locations

const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Building', 'Facility', 'Landmark', 'Other'], required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  description: { type: String },
  imgUrl: { type: String },
  facilities: [{ type: String }]
});

module.exports = mongoose.model('Location', LocationSchema);

// models/Event.js - Model for campus events

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  imgUrl: { type: String },
  registrationLink: { type: String },
  category: { type: String, enum: ['Academic', 'Cultural', 'Sports', 'Workshop', 'Other'] }
});

module.exports = mongoose.model('Event', EventSchema);

// models/Review.js - Model for user reviews

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Review', ReviewSchema);

// models/User.js - Model for user authentication

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);