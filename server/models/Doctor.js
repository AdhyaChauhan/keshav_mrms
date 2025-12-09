const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  clinicAddress: { 
    type: String, 
    required: true 
  },
  specialty: { 
    type: String, 
    required: true 
  },
  scheme: { 
    type: String, 
    enum: ["20%", "30%", "Other"], 
    default: "20%" 
  }
}, { timestamps: true });

module.exports =
  mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
