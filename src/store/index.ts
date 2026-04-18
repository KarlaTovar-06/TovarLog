// src/store/index.ts
import { create } from "zustand";
import { Client, Vehicle } from "@/lib/supabase";

type AppState = {
  // Resultados de búsqueda por placa
  searchResults: Vehicle[];
  searchQuery: string;
  isSearching: boolean;

  // Vehículo seleccionado (cuando el mecánico entra al detalle)
  selectedVehicle: Vehicle | null;

  // Estado de carga global
  loading: boolean;
  error: string | null;

  // Acciones
  setSearchQuery: (query: string) => void;
  selectVehicle: (vehicle: Vehicle | null) => void;
  clearError: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  searchResults: [],
  searchQuery: "",
  isSearching: false,
  selectedVehicle: null,
  upcomingVerifications: [],
  loading: false,
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  selectVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

  clearError: () => set({ error: null }),
}));
