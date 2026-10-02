import "server-only";
import type { Database } from "./database.types";
import { createClient } from "./server";

type Tables = Database["public"]["Tables"];
type TableName = keyof Tables & string;
type TableWithId = {
  [K in TableName]: "id" extends keyof Tables[K]["Row"] ? K : never;
}[TableName];

export async function lire<T extends TableName>(table: T) {
  const supabase = await createClient();
  return supabase.from(table).select("*");
}

export async function lireParId<T extends TableWithId>(table: T, id: Tables[T]["Row"]["id"]) {
  const supabase = await createClient();
  return supabase
    .from(table)
    .select("*")
    .eq("id" as never, id as never)
    .maybeSingle();
}

export async function inserer<T extends TableName>(table: T, valeurs: Tables[T]["Insert"]) {
  const supabase = await createClient();
  return supabase.from(table).insert(valeurs as never);
}

export async function mettreAJour<T extends TableWithId>(
  table: T,
  id: Tables[T]["Row"]["id"],
  valeurs: Tables[T]["Update"],
) {
  const supabase = await createClient();
  return supabase
    .from(table)
    .update(valeurs as never)
    .eq("id" as never, id as never);
}

export async function supprimer<T extends TableWithId>(table: T, id: Tables[T]["Row"]["id"]) {
  const supabase = await createClient();
  return supabase.from(table).delete().eq("id" as never, id as never);
}
