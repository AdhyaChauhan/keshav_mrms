import { useState, useEffect } from "react";
import {
  User,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  getPayments,
  getDoctors,
  deletePayment,
  createPayment,
  updatePayment,
} from "../services/api";

import PaymentForm from "../components/forms/PaymentForm";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [paymentsData, doctorsData] = await Promise.all([
        getPayments(),
        getDoctors(),
      ]);
      setPayments(paymentsData);
      setDoctors(doctorsData);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    await deletePayment(id);
    setPayments(payments.filter((p) => p._id !== id));
  };

  const handleSave = async (data) => {
    try {
      if (selectedPayment) {
        await updatePayment(selectedPayment._id, data);
      } else {
        await createPayment(data);
      }

      setOpenForm(false);
      setSelectedPayment(null);
      loadData();
    } catch (err) {
      console.error("Error saving payment:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-gray-600">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
          <p className="text-gray-500 text-sm">Track pending and received payments</p>
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedPayment(null);
            setOpenForm(true);
          }}
        >
          <Plus size={18} /> Record Payment
        </Button>
      </div>

      {/* PAYMENT TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((p) => (
                <TableRow key={p._id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    {p.doctorName}
                  </TableCell>

                  <TableCell className="font-semibold">
                    ₹{p.amount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge variant={p.status === "Paid" ? "success" : "warning"}>
                      {p.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{p.method}</TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        setSelectedPayment(p);
                        setOpenForm(true);
                      }}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(p._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* PAYMENT FORM MODAL */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {selectedPayment ? "Edit Payment" : "Record Payment"}
            </h2>

            <PaymentForm
              doctors={doctors}
              payment={selectedPayment}
              onSave={handleSave}
              onCancel={() => {
                setSelectedPayment(null);
                setOpenForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
