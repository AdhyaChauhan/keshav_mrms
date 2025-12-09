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
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function VisitForm({ visit, doctors, onSave, onCancel }) {
  const formik = useFormik({
    initialValues: {
      doctorId: visit?.doctorId || "",
      date: visit?.date?.split("T")[0] || "",
      purpose: visit?.purpose || "",
      notes: visit?.notes || "",
    },

    validationSchema: Yup.object({
      doctorId: Yup.string().required("Select a doctor"),
      date: Yup.string().required("Date is required"),
      purpose: Yup.string().required("Purpose required"),
    }),

    onSubmit: (values) => {
      onSave(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {/* Doctor */}
      <div className="space-y-1">
        <Label>Doctor</Label>
        <Select
          value={formik.values.doctorId}
          onValueChange={(val) => formik.setFieldValue("doctorId", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>

          <SelectContent>
            {doctors.map((d) => (
              <SelectItem key={d._id} value={d._id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date */}
      <div className="space-y-1">
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
      </div>

      {/* Purpose */}
      <div className="space-y-1">
        <Label>Purpose</Label>
        <Input
          name="purpose"
          value={formik.values.purpose}
          onChange={formik.handleChange}
        />
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <Label>Notes</Label>
        <Textarea
          rows={3}
          name="notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {visit ? "Update Visit" : "Create Visit"}
        </Button>
      </div>

    </form>
  );
}
