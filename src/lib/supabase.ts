// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos que reflejan exactamente las tablas de Supabase
export type Client = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  created_at: string;
};

export interface Vehicle {
  id: string;
  client_id: string;

  plate: string;
  brand: string;
  model: string;
  year?: number;
  color?: string;
  state?: string;

  engomado_color?: string;
  verification_months?: number[];

  last_verification_date?: string;
  next_verification_date?: string;

  verification_center?: string;
  verification_result?: string;
  mileage?: number;
  notes?: string;

  document_url?: string;

  cost_charged?: number;
  cost_paid?: number;

  created_at: string;
}

export type Verification = {
  id: string;
  vehicle_id: string;
  verification_date: string;
  next_verification_date: string; // calculado por Supabase
  verification_center?: string;
  result: "APROBADO" | "RECHAZADO" | "PENDIENTE";
  mileage?: number;
  notes?: string;
  document_url?: string;
  cost_charged: number;
  cost_paid: number;
  created_at: string;
  vehicles?: Vehicle; // para joins
};
