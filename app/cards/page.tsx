import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Cards() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: cards } = await supabase.from("cards").select();

  return <pre>{JSON.stringify(cards, null, 2)}</pre>
}