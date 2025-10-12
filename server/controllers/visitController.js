const Visit = require('../models/Visit');
const Doctor = require('../models/Doctor');

// Create visit record
exports.createVisit = async (req, res) => {
  try {
    // Check if doctor exists
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all visits for a doctor
exports.getDoctorVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ doctorId: req.params.doctorId })
      .sort({ date: -1 })
      .populate('doctorId', 'name specialty');
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update visit
exports.updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete visit
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.json({ message: 'Visit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};