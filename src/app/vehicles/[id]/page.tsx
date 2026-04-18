"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getVehicleById } from "@/services/vehicles";
import { getVerificationStatus } from "@/utils/status";

export default function VehicleDetailPage() {

  const { id } = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<any>(null);

  useEffect(() => {
    getVehicleById(id as string).then(setVehicle);
  }, [id]);

  if (!vehicle)
    return <div className="p-8 text-2xl text-center">Cargando...</div>;

  const status = getVerificationStatus(vehicle.next_verification_date);

  const statusStyles = {
    urgent: "bg-red-100 border-red-400 text-red-700",
    upcoming: "bg-yellow-100 border-yellow-400 text-yellow-700",
    ok: "bg-green-100 border-green-400 text-green-700",
  };

  const engomadoColors: any = {
    ROJO: "bg-red-500",
    AMARILLO: "bg-yellow-400",
    VERDE: "bg-green-500",
    AZUL: "bg-blue-500",
    ROSA: "bg-pink-500",
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-lg mx-auto">
      <button
        onClick={() => router.back()}
        className="text-blue-600 text-lg mb-4"
      >
        ← Regresar
      </button>

      {/* Info del vehículo */}
      <div className="bg-white rounded-2xl p-5 shadow-md mb-5">
        <p className="text-4xl font-bold text-blue-700">{vehicle.plate}</p>
        <p className="text-2xl text-gray-700 mt-1">
          {vehicle.brand} {vehicle.model} {vehicle.year}
        </p>
        <p className="text-xl text-gray-500">
          {vehicle.color} — {vehicle.state}
        </p>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-lg text-gray-600">👤 {vehicle.clients?.name}</p>
          <p className="text-lg text-gray-600">📞 {vehicle.clients?.phone}</p>
        </div>
      </div>

      {/* Engomado */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-6 h-6 rounded-full ${
            engomadoColors[vehicle.engomado_color] || "bg-gray-400"
          }`}
        />
        <p className="text-xl font-bold">{vehicle.engomado_color}</p>
      </div>

      {/* Próxima verificación */}
      <div className={`border-2 rounded-2xl p-5 mb-5`}>
        <p className="text-lg font-bold">📅 Próxima verificación</p>

        <p className="text-3xl font-bold mt-1">
          {vehicle.next_verification_date
            ? new Date(vehicle.next_verification_date).toLocaleDateString(
                "es-MX",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : "Sin fecha"}
        </p>
      </div>

    </main>
  );
}
