import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    doctorName: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    purpose: {
      type: String,
      required: true,
      trim: true
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Visit =
  mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

export default Visit;
