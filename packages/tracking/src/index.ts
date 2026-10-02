import "server-only";
import { createClient } from "@marketplace/data/server";
import type { Database } from "@marketplace/data/database.types";

export type Evenement = Database["public"]["Tables"]["evenements"]["Insert"];

export async function track(evenement: Evenement) {
  const supabase = await createClient();
  const { error } = await supabase.from("evenements").insert(evenement);
  if (error) {
    throw error;
  }
}
