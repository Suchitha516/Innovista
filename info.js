// routes/info.js - Routes for college information

const express = require('express');
const router = express.Router();
const { Overview, Department, Program, Faculty, TimelineEvent, FAQ } = require('../models/Info');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get college overview
router.get('/overview', async (req, res) => {
  try {
    const overview = await Overview.findOne();
    res.json(overview);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update college overview (admin only)
router.put('/overview', [auth, admin], async (req, res) => {
  try {
    const overview = await Overview.findOne();
    if (overview) {
      const updatedOverview = await Overview.findByIdAndUpdate(
        overview._id,
        req.body,
        { new: true }
      );
      return res.json(updatedOverview);
    }
    
    // If no overview exists yet, create one
    const newOverview = new Overview(req.body);
    await newOverview.save();
    res.json(newOverview);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add new department (admin only)
router.post('/departments', [auth, admin], async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get department by ID
router.get('/departments/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update department (admin only)
router.put('/departments/:id', [auth, admin], async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete department (admin only)
router.delete('/departments/:id', [auth, admin], async (req, res) => {
  try {
    const department = await Department.findByIdAndRemove(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json({ msg: 'Department removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Similar CRUD routes for Programs, Faculty, Timeline Events, and FAQs
// ...

// Get all programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get programs by department
router.get('/programs/department/:department', async (req, res) => {
  try {
    const programs = await Program.find({ department: req.params.department });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all faculty
router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get faculty by department
router.get('/faculty/department/:department', async (req, res) => {
  try {
    const faculty = await Faculty.find({ department: req.params.department });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all timeline events
router.get('/timeline', async (req, res) => {
  try {
    const events = await TimelineEvent.find().sort({ year: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all FAQs
router.get('/faq', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;