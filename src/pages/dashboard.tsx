import React from "react";

const StatCard: React.FC<{ title: string; value: string; desc?: string; icon?: React.ReactNode }> = ({ title, value, desc, icon }) => (
  <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-4 sm:p-5 shadow hover:shadow-gray-900/40 transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-100 mt-1">{value}</h3>
        {desc && <p className="text-xs text-gray-500 mt-1">{desc}</p>}
      </div>
      <div className="w-10 h-10 rounded-xl bg-gray-700/60 border border-gray-600 flex items-center justify-center text-gray-200">
        {icon ?? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V3a1 1 0 112 0v8m-2 10h2m7-7H4" />
          </svg>
        )}
      </div>
    </div>
  </div>
);

const PlaceholderChart: React.FC = () => <div className="h-64 bg-gray-800/60 border border-gray-700 rounded-2xl flex items-center justify-center text-gray-400">(Chart area — ganti dengan komponen chart favoritmu)</div>;

const RecentTable: React.FC = () => (
  <div className="bg-gray-800/70 border border-gray-700 rounded-2xl overflow-hidden">
    <div className="px-4 py-3 border-b border-gray-700 text-sm font-medium text-gray-200">Aktivitas Terbaru</div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-800/70 text-gray-400">
          <tr>
            <th className="text-left px-4 py-2">Tanggal</th>
            <th className="text-left px-4 py-2">Aktivitas</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Jumlah</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {[
            { date: "11 Sep 2025", activity: "Transaksi #INV-10239", status: "Sukses", amount: "Rp 1.250.000" },
            { date: "11 Sep 2025", activity: "Transaksi #INV-10238", status: "Pending", amount: "Rp 310.000" },
            { date: "10 Sep 2025", activity: "Retur Barang R-223", status: "Sukses", amount: "Rp 120.000" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-gray-800/40">
              <td className="px-4 py-2 text-gray-300">{row.date}</td>
              <td className="px-4 py-2 text-gray-100">{row.activity}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded-lg border ${row.status === "Sukses" ? "bg-emerald-900/20 text-emerald-300 border-emerald-700/40" : "bg-yellow-900/20 text-yellow-300 border-yellow-700/40"}`}>{row.status}</span>
              </td>
              <td className="px-4 py-2 text-gray-200">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-400">Ringkasan performa hari ini</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Pendapatan Hari Ini" value="Rp 3.450.000" desc="+8% vs kemarin" />
        <StatCard title="Transaksi" value="127" desc="+12 transaksi" />
        <StatCard title="Pelanggan Baru" value="18" desc="+3 pelanggan" />
        <StatCard title="Stok Rendah" value="7 Item" desc="Butuh restock" />
      </div>

      {/* Chart + Table */}
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
