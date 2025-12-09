import { useState, useEffect } from "react";
import {
  User,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import DoctorForm from "@/components/forms/DoctorForm";

import {
  getDoctors,
  deleteDoctor,
  createDoctor as addDoctor,
  updateDoctor
} from "../services/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Error loading doctors:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (values) => {
    try {
      if (selectedDoctor) {
        const updated = await updateDoctor(selectedDoctor._id, values);
        setDoctors(doctors.map(d => d._id === updated._id ? updated : d));
      } else {
        const created = await addDoctor(values);
        setDoctors([...doctors, created]);
      }
      setOpenForm(false);
      setSelectedDoctor(null);
    } catch (err) {
      console.error("Failed to save doctor:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    setDoctors(doctors.filter((d) => d._id !== id));
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10 text-gray-600">
        Loading doctors...
      </div>
    );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Doctors</h1>
          <p className="text-gray-500 text-sm">Manage doctor profiles and schemes</p>
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedDoctor(null);
            setOpenForm(true);
          }}
        >
          <Plus size={18} /> Add Doctor
        </Button>
      </div>

      {/* DOCTORS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Directory</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {doctors.map((d) => (
                <TableRow key={d._id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    {d.name}
                  </TableCell>

                  <TableCell>{d.contact}</TableCell>
                  <TableCell>{d.clinicAddress}</TableCell>

                  <TableCell>
                    <Badge variant="outline">{d.specialty}</Badge>
                  </TableCell>

                  <TableCell className="font-semibold">{d.scheme}</TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => {
                        setSelectedDoctor(d);
                        setOpenForm(true);
                      }}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(d._id)}
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

      {/* DOCTOR FORM MODAL */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl animate-in fade-in duration-200">
            <h2 className="text-lg font-semibold mb-3">
              {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <DoctorForm
              doctor={selectedDoctor}
              onSave={handleSave}
              onCancel={() => {
                setOpenForm(false);
                setSelectedDoctor(null);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
