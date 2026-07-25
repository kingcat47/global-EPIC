import { useEffect, useState } from "react";
import type { EonetEvent } from "@/types/eonet";

export function useEonetEvents() {
  const [events, setEvents] = useState<EonetEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=500&status=open")
      .then((res) => {
        if (!res.ok) throw new Error("EONET API 요청 실패");
        return res.json();
      })
      .then((data) => {
        setEvents(data.events ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading, error };
}
