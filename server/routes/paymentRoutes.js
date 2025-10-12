const express = require('express');
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getDoctorPayments,
  getPendingPayments
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.get('/doctor/:doctorId', getDoctorPayments);
router.get('/status/pending', getPendingPayments);

module.exports = router;