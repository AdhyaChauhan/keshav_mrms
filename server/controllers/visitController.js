import Visit from "../models/Visit.js";
import Doctor from "../models/doctor.js";

// GET ALL VISITS
export const getVisits = async (req, res) => {
  try {
    const visits = await Visit.find().sort({ date: -1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET ONE VISIT
export const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    res.json(visit);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE VISIT
export const createVisit = async (req, res) => {
  try {
    const { doctorId, date, purpose, notes } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const visit = new Visit({
      doctorId,
      doctorName: doctor.name,
      date,
      purpose,
      notes
    });

    await visit.save();
    res.status(201).json(visit);

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};


// UPDATE VISIT
export const updateVisit = async (req, res) => {
  try {
    const { doctorId, date, purpose, notes } = req.body;

    const updateData = { date, purpose, notes };

    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });

      updateData.doctorId = doctorId;
      updateData.doctorName = doctor.name;
    }

    const updated = await Visit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Visit not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE VISIT
export const deleteVisit = async (req, res) => {
  try {
    const deleted = await Visit.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Visit not found" });
    }

    res.json({ message: "Visit deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
