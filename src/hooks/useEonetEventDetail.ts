import { useEffect, useState } from "react";
import type { EonetEvent } from "@/types/eonet";

export function useEonetEventDetail(id: string | undefined) {
  const [event, setEvent] = useState<EonetEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`https://eonet.gsfc.nasa.gov/api/v3/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("이벤트를 불러오지 못했습니다");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { event, loading, error };
}
