"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/store";
import { getRecentVehicles } from "@/services/vehicles";

export default function HomePage() {
  const router = useRouter();
  const {
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    selectVehicle,
  } = useAppStore();

  const [recent, setRecent] = useState<any[]>([]);


  // 🆕 últimos vehículos
  useEffect(() => {
    getRecentVehicles().then(setRecent);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-gray-800">🔧 Mi Taller</h1>
      </div>

      {/* Input búsqueda */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
        placeholder="ABC-123"
        className="w-full border-3 border-blue-400 rounded-2xl px-6 py-5 text-3xl
                   font-bold text-center tracking-widest uppercase
                   focus:outline-none focus:border-blue-600 shadow-md"
      />

      {/* Resultados */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div className="mt-4 flex flex-col gap-3">
            {searchResults.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  selectVehicle(v);
                  router.push(`/vehicles/${v.id}`);
                }}
                className="bg-white p-4 rounded-xl shadow text-left"
              >
                <p className="text-2xl font-bold text-blue-700">{v.plate}</p>
                <p>
                  {v.brand} {v.model}
                </p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🆕 Últimos vehículos */}
      {recent.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6 mb-2">🆕 Recientes</h2>
          <div className="flex flex-col gap-2">
            {recent.map((v) => (
              <button
                key={v.id}
                onClick={() => router.push(`/vehicles/${v.id}`)}
                className="bg-white p-4 rounded-xl shadow text-left"
              >
                <p className="text-xl font-bold">{v.plate}</p>
                <p className="text-gray-500">{v.clients?.name}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Botones */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => router.push("/clients/new")}
          className="bg-blue-600 text-white py-4 rounded-xl text-xl"
        >
          ➕ Nuevo cliente
        </button>

        <button
          onClick={() => router.push("/verifications/upcoming")}
          className="bg-orange-500 text-white py-4 rounded-xl text-xl"
        >
          📅 Próximas verificaciones
        </button>
      </div>
    </main>
  );
}
