import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {/* Grid responsive */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Users" value="1,245" />
            <Card title="Revenue" value="€12,300" />
            <Card title="Orders" value="320" />
            <Card title="Promotial codes" value="100" />
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}