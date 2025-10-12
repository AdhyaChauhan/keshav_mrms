const express = require('express');
const {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

const router = express.Router();

// POST /api/doctors - Create new doctor
router.post('/', createDoctor);

// GET /api/doctors - Get all doctors
router.get('/', getAllDoctors);

// GET /api/doctors/:id - Get single doctor
router.get('/:id', getDoctor);

// PUT /api/doctors/:id - Update doctor
router.put('/:id', updateDoctor);

// DELETE /api/doctors/:id - Delete doctor
router.delete('/:id', deleteDoctor);

module.exports = router;