"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { createClient } from "@/services/clients";
import { createVehicle } from "@/services/vehicles";
import {
  getEngomadoData,
  getNextVerificationDate,
} from "@/utils/verifications";

import { getMakes, getModels } from "@/services/vehiclesCatalog";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // CLIENTE
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // VEHÍCULO
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("CDMX");

  // CATALOGO VEHÍCULOS (SUPABASE)
  const [makes, setMakes] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  const [selectedMake, setSelectedMake] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  // 🔥 CARGAR MARCAS
  useEffect(() => {
    async function loadMakes() {
      try {
        const data = await getMakes();
        setMakes(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadMakes();
  }, []);

  // 🔥 CARGAR MODELOS POR MARCA
  useEffect(() => {
    if (!selectedMake) return;

    async function loadModels() {
      try {
        const data = await getModels(selectedMake.id);
        setModels(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadModels();
  }, [selectedMake]);

  // 💾 SUBMIT
  async function handleSubmit() {
    if (!name || !plate || !selectedMake || !selectedModel) {
      setError("Faltan datos obligatorios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { color: engomadoColor, months } = getEngomadoData(plate);
      const nextDate = getNextVerificationDate(months);

      // 1. CLIENTE
      const client = await createClient({
        name,
        phone,
        email: "",
        notes: "",
      });

      // 2. VEHÍCULO
      await createVehicle({
        client_id: client.id,
        plate: plate.toUpperCase(),
        brand: selectedMake.name,
        model: selectedModel.name,
        year: year ? parseInt(year) : undefined,
        color,
        state,

        engomado_color: engomadoColor,
        verification_months: months,
        last_verification_date: new Date().toISOString(),
        next_verification_date: nextDate,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-lg mx-auto">
      <button onClick={() => router.back()} className="text-blue-600 mb-4">
        ← Regresar
      </button>

      <h1 className="text-3xl font-bold mb-6">Nuevo cliente y vehículo</h1>

      <div className="flex flex-col gap-4">
        {/* CLIENTE */}
        <Input label="Nombre" value={name} onChange={setName} />
        <Input label="Teléfono" value={phone} onChange={setPhone} />

        {/* VEHÍCULO */}
        <Input label="Placa" value={plate} onChange={setPlate} />

        {/* MARCAS */}
        <select
          value={selectedMake?.id || ""}
          onChange={(e) => {
            const make = makes.find((m) => m.id === parseInt(e.target.value));
            setSelectedMake(make);
            setSelectedModel(null);
            setModels([]);
          }}
          className="border p-3 rounded-xl"
        >
          <option value="">Selecciona marca</option>
          {makes.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* MODELOS */}
        <select
          value={selectedModel?.id || ""}
          onChange={(e) => {
            const model = models.find((m) => m.id === parseInt(e.target.value));
            setSelectedModel(model);
          }}
          disabled={!selectedMake}
          className="border p-3 rounded-xl"
        >
          <option value="">Selecciona modelo</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <Input label="Año" value={year} onChange={setYear} />
        <Input label="Color" value={color} onChange={setColor} />

        {/* ESTADO */}
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border p-3 rounded-xl"
        >
          {["CDMX", "EdoMex", "Jalisco", "Nuevo León", "Puebla", "Otro"].map(
            (s) => (
              <option key={s}>{s}</option>
            )
          )}
        </select>

        {error && (
          <p className="text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>
        )}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </main>
  );
}
