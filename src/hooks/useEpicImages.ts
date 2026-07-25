import { useEffect, useState } from "react";
import type { EpicImage } from "@/types/epic";

export function useEpicImages(date?: string) {
  const [images, setImages] = useState<EpicImage[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://epic.gsfc.nasa.gov/api/natural/available")
      .then((res) => res.json())
      .then((data: Array<{ date: string }>) => {
        setAvailableDates(data.map((d) => d.date));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = date
      ? `https://epic.gsfc.nasa.gov/api/natural/date/${date}`
      : "https://epic.gsfc.nasa.gov/api/natural";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("EPIC API 요청 실패");
        return res.json();
      })
      .then((data) => setImages(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [date]);

  return { images, availableDates, loading, error };
}
