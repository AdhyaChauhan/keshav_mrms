import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  Wallet2,
  TrendingUp,
  ReceiptIndianRupee
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    doctors: 0,
    visits: 0,
    pendingPayments: 0,
    collectedPayments: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardData();
      setStats({
        doctors: data.doctorsCount,
        pendingPayments: data.pendingPayments,
        collectedPayments: data.collectedPayments,
        revenue: data.totalRevenue,
        visits: 142,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Medical Representative Management System
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          title="Doctors"
          value={stats.doctors}
        />

        <StatCard
          icon={<ReceiptIndianRupee className="w-5 h-5 text-pink-600" />}
          title="Pending Payments"
          value={stats.pendingPayments}
        />

        <StatCard
          icon={<Wallet2 className="w-5 h-5 text-blue-600" />}
          title="Collected Payments"
          value={stats.collectedPayments}
        />

        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-yellow-600" />}
          title="Revenue (₹)"
          value={stats.revenue.toLocaleString()}
        />

        <StatCard
          icon={<Calendar className="w-5 h-5 text-green-600" />}
          title="Monthly Visits"
          value={stats.visits}
        />
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Recent Activity */}
        <Card className="bg-white text-black shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {[
              { action: "Placed an order", doctor: "Dr. Sharma", time: "2h ago" },
              { action: "Requested sample", doctor: "Dr. Patel", time: "5h ago" },
              { action: "Payment received", doctor: "Dr. Gupta", time: "1 day ago" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg hover:bg-gray-50 transition flex justify-between"
              >
                <div>
                  <p className="font-medium text-sm text-black">{item.doctor}</p>
                  <p className="text-gray-600 text-xs">{item.action}</p>
                </div>
                <p className="text-gray-500 text-xs">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white text-black shadow-sm">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <ProductBar name="MPFol-SL" percent={85} />
            <ProductBar name="Rebiz-D" percent={72} />
            <ProductBar name="Immuflora" percent={63} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function StatCard({ icon, title, value }) {
  return (
    <Card className="p-4 bg-white text-black shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </Card>
  );
}

function ProductBar({ name, percent }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-indigo-600 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
