import type { EonetEvent } from "@/types/eonet";

export const CATEGORY_COLORS: Record<string, string> = {
  wildfires: "#FF4500",
  floods: "#1E90FF",
  severeStorms: "#9370DB",
  earthquakes: "#D2691E",
  volcanoes: "#FF6347",
  drought: "#DAA520",
  landslides: "#8B4513",
  snow: "#B0E0E6",
  seaLakeIce: "#ADD8E6",
  dustHaze: "#C2B280",
  waterColor: "#20B2AA",
  tempExtremes: "#FF8C00",
  manmade: "#808080",
};

export function getCategoryColor(categoryId: string): string {
  return CATEGORY_COLORS[categoryId] ?? "#45C1FF";
}

export function getCategoryLabel(categoryId: string): string {
  const labels: Record<string, string> = {
    wildfires: "Wildfires",
    floods: "Floods",
    severeStorms: "Severe Storms",
    earthquakes: "Earthquakes",
    volcanoes: "Volcanoes",
    drought: "Drought",
    landslides: "Landslides",
    snow: "Snow",
    seaLakeIce: "Sea & Lake Ice",
    dustHaze: "Dust & Haze",
    waterColor: "Water Color",
    tempExtremes: "Temp. Extremes",
    manmade: "Manmade",
  };
  return labels[categoryId] ?? categoryId;
}

export function getEventCoordinates(event: EonetEvent): { lat: number; lng: number } | null {
  const geo = event.geometry[0];
  if (!geo || geo.type !== "Point") return null;
  const coords = geo.coordinates as number[];
  return { lat: coords[1], lng: coords[0] };
}

export function buildEpicImageUrl(image: string, date: string): string {
  const [year, month, day] = date.split(" ")[0].split("-");
  return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
