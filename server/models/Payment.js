const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  doctorName: {
    type: String,
    required: true
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  method: { 
    type: String, 
    enum: ['Cash', 'Bank Transfer', 'UPI', 'Cheque'], 
    default: 'Cash' 
  },
  notes: String,
  status: { 
    type: String, 
    enum: ['Pending', 'Paid'], 
    default: 'Paid' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);