import React from "react";
import Profile from "../components/profile";
import StatCard from "../components/statcard";
import PlaceholderChart from "../components/placeholderchart";
import RecentTable from "../components/recenttable";

const API_BASE = "https://take-home-test-api.nutech-integrasi.com";

const Dashboard: React.FC = () => {
  const balance = localStorage.getItem("balance");
  if (balance) {
    const parsedBalance = JSON.parse(balance);
    console.log(parsedBalance.data);
  } else {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${API_BASE}/balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        console.log(data.data);
        if (!res.ok || !data?.data) {
          console.error("Gagal memuat balance");
        }

        localStorage.setItem("balance", JSON.stringify(data.data.balance));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBalance();
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <Profile />
          <p className="text-sm text-gray-400">Ringkasan performa hari ini</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Pendapatan Hari Ini" value={balance ?? "0"} desc="+8% vs kemarin" />
        <StatCard title="Transaksi" value="127" desc="+12 transaksi" />
        <StatCard title="Pelanggan Baru" value="18" desc="+3 pelanggan" />
        <StatCard title="Stok Rendah" value="7 Item" desc="Butuh restock" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <PlaceholderChart />
        </div>
        <div className="xl:col-span-1">
          <RecentTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
