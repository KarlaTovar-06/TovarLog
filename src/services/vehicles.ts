import { supabase, Vehicle } from "@/lib/supabase";

export async function createVehicle(vehicle: Partial<Vehicle>) {
  const { data, error } = await supabase
    .from("vehicles")
    .insert(vehicle)
    .select()
    .single();

  if (error) throw error;
  return data as Vehicle;
}

export async function updateVehicle(id: string, updates: Partial<Vehicle>) {
  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Vehicle;
}

export async function getUpcomingVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select(`*, clients (name, phone)`)
    .order("next_verification_date", { ascending: true });

  if (error) throw error;
  return data as Vehicle[];
}

export async function getRecentVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select(`*, clients (name, phone)`)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) throw error;
  return data as Vehicle[];
}

export async function getVehicleById(id: string) {
  const { data, error } = await supabase
    .from("vehicles")
    .select(`*, clients (name, phone)`)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
