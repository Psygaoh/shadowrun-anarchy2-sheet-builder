import { PostgrestSingleResponse } from '@supabase/supabase-js';

type QueryResult<T> = PromiseLike<PostgrestSingleResponse<T>>;

export async function fetchMany<T>(
  request: QueryResult<T[]>
): Promise<T[]> {
  const { data, error } = await request;
  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function fetchOne<T>(
  request: QueryResult<T>
): Promise<T> {
  const { data, error } = await request;
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('No data returned from Supabase.');
  }
  return data;
}

export async function run(request: QueryResult<null>): Promise<void> {
  const { error } = await request;
  if (error) {
    throw error;
  }
}
