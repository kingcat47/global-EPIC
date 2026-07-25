import { lazy, Suspense, useRef } from "react";
import type { EonetEvent } from "@/types/eonet";
import { getCategoryColor, getEventCoordinates } from "@/utils/eventUtils";
import s from "./styles.module.scss";

const Globe = lazy(() => import("react-globe.gl"));

interface GlobePoint {
  lat: number;
  lng: number;
  color: string;
  size: number;
  label: string;
  eventId: string;
}

interface GlobeViewerProps {
  events: EonetEvent[];
  onEventClick?: (eventId: string) => void;
}

export default function GlobeViewer({ events, onEventClick }: GlobeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const points: GlobePoint[] = events
    .map((ev) => {
      const coords = getEventCoordinates(ev);
      if (!coords) return null;
      const color = getCategoryColor(ev.categories[0]?.id ?? "");
      return {
        lat: coords.lat,
        lng: coords.lng,
        color,
        size: 0.5,
        label: ev.title,
        eventId: ev.id,
      };
    })
    .filter((p): p is GlobePoint => p !== null);

  return (
    <div ref={containerRef} className={s.container}>
      <Suspense fallback={<div className={s.loading}>Loading globe...</div>}>
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude="size"
          pointRadius={0.4}
          pointLabel="label"
          onPointClick={(point: object) => {
            const p = point as GlobePoint;
            onEventClick?.(p.eventId);
          }}
          width={containerRef.current?.clientWidth ?? 600}
          height={containerRef.current?.clientHeight ?? 600}
          atmosphereColor="#45C1FF"
          atmosphereAltitude={0.15}
        />
      </Suspense>
    </div>
  );
}
