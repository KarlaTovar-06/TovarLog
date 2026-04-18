// src/services/clients.ts
import { supabase, Client } from "@/lib/supabase";

export async function createClient(client: Omit<Client, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("clients")
    .insert(client)
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}

export async function getAllClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as Client[];
}
