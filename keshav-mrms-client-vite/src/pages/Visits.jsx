import { useEffect, useState } from "react";
import { CalendarDays, Plus, Trash2, Pencil } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getVisits, deleteVisit, getDoctors, createVisit, updateVisit } from "../services/api";
import VisitForm from "@/components/forms/VisitForm";

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  // -------------------- LOAD VISITS --------------------
  async function loadVisits() {
    try {
      const data = await getVisits();
      console.log("VISITS FROM API:", data);

      // safety: ensure data is array
      setVisits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading visits:", err);
    } finally {
      setLoading(false);
    }
  }

  // -------------------- LOAD DOCTORS --------------------
  async function loadDoctorsList() {
    try {
      const data = await getDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  }

  useEffect(() => {
    loadVisits();
    loadDoctorsList();
  }, []);

  // -------------------- DELETE VISIT --------------------
  async function handleDelete(id) {
    await deleteVisit(id);
    setVisits(visits.filter((v) => v._id !== id));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600">
        Loading visits...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Visits</h1>
          <p className="text-gray-500 text-sm">Track your daily MR visits</p>
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedVisit(null);
            setOpenForm(true);
          }}
        >
          <Plus size={16} /> Add Visit
        </Button>
      </div>

      {/* VISIT LIST */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-indigo-600" />
            Visit History
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {visits.map((v) => (
            <div
              key={v._id}
              className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div className="space-y-1">
                <p className="font-medium">{v.doctorName}</p>

                <p className="text-sm text-gray-600">
                  {new Date(v.date).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-500">{v.purpose}</p>

                {v.notes && (
                  <p className="text-xs text-gray-400">{v.notes}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    setSelectedVisit(v);
                    setOpenForm(true);
                  }}
                >
                  <Pencil size={16} />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(v._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}

          {visits.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No visit records found.
            </p>
          )}
        </CardContent>
      </Card>

      {/* VISIT FORM MODAL */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              {selectedVisit ? "Edit Visit" : "Add Visit"}
            </h2>

            <VisitForm
              visit={selectedVisit}
              doctors={doctors}
              onSave={async (values) => {
  if (selectedVisit) {
    await updateVisit(selectedVisit._id, values);
  } else {
    await createVisit(values);
  }

  setOpenForm(false);
  loadVisits();
}}

              onCancel={() => setOpenForm(false)}
            />

          </div>
        </div>
      )}
    </div>
  );
}
