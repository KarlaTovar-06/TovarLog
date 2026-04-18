"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUpcomingVehicles } from "@/services/vehicles";

export default function UpcomingPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    getUpcomingVehicles().then(setVehicles);
  }, []);

  const today = new Date();

  const urgent = vehicles.filter(
    (v) => new Date(v.next_verification_date) < today
  );

  const upcoming = vehicles.filter((v) => {
    const diff =
      (new Date(v.next_verification_date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  });

  const later = vehicles.filter((v) => {
    const diff =
      (new Date(v.next_verification_date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 30;
  });

  function Card({ v }: any) {
    return (
      <button
        onClick={() => router.push(`/vehicles/${v.id}`)}
        className="bg-white rounded-xl p-4 shadow text-left"
      >
        <p className="text-2xl font-bold">{v.plate}</p>
        <p className="text-gray-600">{v.clients?.name}</p>
        <p className="text-gray-400">
          {new Date(v.next_verification_date).toLocaleDateString("es-MX")}
        </p>
      </button>
    );
  }

  function Section(title: string, data: any[], color: string) {
    if (data.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-2 ${color}`}>{title}</h2>
        <div className="flex flex-col gap-2">
          {data.map((v) => (
            <Card key={v.id} v={v} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-lg mx-auto">
      <button onClick={() => router.back()} className="text-blue-600 mb-4">
        ← Regresar
      </button>

      <h1 className="text-3xl font-bold mb-4">📅 Verificaciones</h1>

      {Section("🔴 Urgentes", urgent, "text-red-600")}
      {Section("🟡 Próximas", upcoming, "text-yellow-600")}
      {Section("🟢 Después", later, "text-green-600")}
    </main>
  );
}
