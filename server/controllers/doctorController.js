const Doctor = require('../models/doctor');

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Public
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Public
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Public
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};





exports.getDoctorsCount = async (req, res) => {
  try {
    console.log('🟢 getDoctorsCount function called');
    console.log('🟢 Doctor model:', Doctor);
    const count = await Doctor.countDocuments();
    console.log('🟢 Doctors count from DB:', count);
    res.json({ count });
  } catch (error) {
    console.error('🔴 Error in getDoctorsCount:', error);
    res.status(500).json({ error: error.message });
  }
};