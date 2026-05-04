import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SeatCounts = {
  girls_applied: number;
  boys_applied: number;
  girls_accepted: number;
  boys_accepted: number;
  girls_cap: number;
  boys_cap: number;
};

const FALLBACK: SeatCounts = {
  girls_applied: 0,
  boys_applied: 0,
  girls_accepted: 0,
  boys_accepted: 0,
  girls_cap: 75,
  boys_cap: 25,
};

export function useSeatCounts(refreshKey = 0) {
  const [counts, setCounts] = useState<SeatCounts>(FALLBACK);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase.rpc("get_seat_counts");
      if (!alive) return;
      if (!error && data && data[0]) setCounts(data[0] as SeatCounts);
    })();
    return () => {
      alive = false;
    };
  }, [refreshKey]);

  return counts;
}
