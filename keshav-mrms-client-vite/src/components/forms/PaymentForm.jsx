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

export default function PaymentForm({ doctors, payment, onSave, onCancel }) {
  const formik = useFormik({
    initialValues: {
      doctorId: payment?.doctorId || "",
      amount: payment?.amount || "",
      date:
        payment?.date
          ? new Date(payment.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      method: payment?.method || "Cash",
      status: payment?.status || "Paid",
      notes: payment?.notes || "",
    },

    validationSchema: Yup.object({
      doctorId: Yup.string().required("Doctor is required"),
      amount: Yup.number().required("Amount is required").positive(),
      date: Yup.date().required("Date is required"),
      method: Yup.string().required("Method required"),
      status: Yup.string().required("Status required"),
    }),

    onSubmit: onSave,
  });

  const methods = ["Cash", "Bank Transfer", "UPI", "Cheque"];
  const statuses = ["Pending", "Paid"];

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {/* DOCTOR */}
      <div>
        <Label>Doctor</Label>
        <Select
          value={formik.values.doctorId}
          onValueChange={(val) => formik.setFieldValue("doctorId", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Doctor" />
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

      {/* AMOUNT */}
      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </div>

      {/* DATE */}
      <div>
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
      </div>

      {/* PAYMENT METHOD */}
      <div>
        <Label>Payment Method</Label>
        <Select
          value={formik.values.method}
          onValueChange={(val) => formik.setFieldValue("method", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>

          <SelectContent>
            {methods.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* STATUS */}
      <div>
        <Label>Status</Label>
        <Select
          value={formik.values.status}
          onValueChange={(val) => formik.setFieldValue("status", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* NOTES */}
      <div>
        <Label>Notes</Label>
        <Textarea
          name="notes"
          rows={3}
          value={formik.values.notes}
          onChange={formik.handleChange}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {payment ? "Update Payment" : "Record Payment"}
        </Button>
      </div>
    </form>
  );
}
