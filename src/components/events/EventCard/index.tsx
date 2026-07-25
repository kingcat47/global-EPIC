import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import type { EonetEvent } from "@/types/eonet";
import { formatDate, getEventCoordinates } from "@/utils/eventUtils";
import CategoryBadge from "@/components/events/CategoryBadge";
import s from "./styles.module.scss";

interface EventCardProps {
  event: EonetEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const coords = getEventCoordinates(event);

  return (
    <div className={s.card} onClick={() => navigate(`/events/${event.id}`)}>
      <div className={s.badges}>
        {event.categories.map((cat) => (
          <CategoryBadge key={cat.id} categoryId={cat.id} />
        ))}
      </div>
      <h3 className={s.title}>{event.title}</h3>
      <div className={s.meta}>
        <span className={s.metaItem}>
          <Clock size={13} />
          {formatDate(event.geometry[0]?.date ?? "")}
        </span>
        {coords && (
          <span className={s.metaItem}>
            <MapPin size={13} />
            {coords.lat.toFixed(2)}°, {coords.lng.toFixed(2)}°
          </span>
        )}
      </div>
    </div>
  );
}
