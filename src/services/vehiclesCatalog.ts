import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🔥 MARCAS
export async function getMakes() {
  const { data, error } = await supabase
    .from("vehicle_makes")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

// 🔥 MODELOS POR MARCA
export async function getModels(makeId: number) {
  const { data, error } = await supabase
    .from("vehicle_models")
    .select("*")
    .eq("make_id", makeId)
    .order("name");

  if (error) throw error;
  return data;
}