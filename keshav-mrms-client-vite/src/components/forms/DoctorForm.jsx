import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function DoctorForm({ doctor, onSave, onCancel }) {

  const formik = useFormik({
    initialValues: {
      name: doctor?.name || "",
      contact: doctor?.contact || "",
      email: doctor?.email || "",
      clinicAddress: doctor?.clinicAddress || "",
      specialty: doctor?.specialty || "",
      scheme: doctor?.scheme || "20%",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      contact: Yup.string().required("Contact required"),
      specialty: Yup.string().required("Specialty required"),
      scheme: Yup.string().required("Scheme required"),
    }),

    onSubmit: onSave,
  });

  const specialties = [
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "General Medicine",
    "Dermatology",
    "Neurology",
    "Gynecology",
    "Dentistry",
    "Ophthalmology",
  ];

  const schemes = ["20%", "30%", "Other"];

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {/* NAME */}
      <div>
        <Label>Doctor Name</Label>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>

      {/* CONTACT */}
      <div>
        <Label>Contact Number</Label>
        <Input
          name="contact"
          value={formik.values.contact}
          onChange={formik.handleChange}
        />
      </div>

      {/* EMAIL */}
      <div>
        <Label>Email (optional)</Label>
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>

      {/* ADDRESS */}
      <div>
        <Label>Clinic Address</Label>
        <Textarea
          name="clinicAddress"
          rows={3}
          value={formik.values.clinicAddress}
          onChange={formik.handleChange}
        />
      </div>

      {/* SPECIALTY */}
      <div>
        <Label>Specialty</Label>
        <Select
          value={formik.values.specialty}
          onValueChange={(val) => formik.setFieldValue("specialty", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>

          <SelectContent>
            {specialties.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SCHEME */}
      <div>
        <Label>Commission Scheme</Label>
        <Select
          value={formik.values.scheme}
          onValueChange={(val) => formik.setFieldValue("scheme", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select scheme" />
          </SelectTrigger>

          <SelectContent>
            {schemes.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">
          {doctor ? "Update Doctor" : "Add Doctor"}
        </Button>
      </div>
    </form>
  );
}
