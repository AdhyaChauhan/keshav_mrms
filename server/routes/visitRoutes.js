const express = require('express');
const {
  createVisit,
  getDoctorVisits,
  updateVisit,
  deleteVisit
} = require('../controllers/visitController');

const router = express.Router();

router.post('/', createVisit);
router.get('/doctor/:doctorId', getDoctorVisits);
router.put('/:id', updateVisit);
router.delete('/:id', deleteVisit);

module.exports = router;