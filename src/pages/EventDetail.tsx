import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin, Clock } from "lucide-react";
import { useEonetEventDetail } from "@/hooks/useEonetEventDetail";
import { CategoryBadge } from "@/components/events";
import { formatDate, getEventCoordinates } from "@/utils/eventUtils";
import s from "./EventDetail.module.scss";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEonetEventDetail(id);

  if (loading) {
    return (
      <div className={s.page}>
        <div className={s.inner}>
          <p className={s.loading}>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className={s.page}>
        <div className={s.inner}>
          <Link to="/events" className={s.back}>
            <ArrowLeft size={16} />
            Back to Events
          </Link>
          <p className={s.error}>{error ?? "Event not found."}</p>
        </div>
      </div>
    );
  }

  const coords = getEventCoordinates(event);

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Link to="/events" className={s.back}>
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className={s.card}>
          <div className={s.badges}>
            {event.categories.map((cat) => (
              <CategoryBadge key={cat.id} categoryId={cat.id} />
            ))}
          </div>

          <h1 className={s.title}>{event.title}</h1>

          {event.description && (
            <p className={s.description}>{event.description}</p>
          )}

          <div className={s.metaGrid}>
            <div className={s.metaItem}>
              <Clock size={15} className={s.metaIcon} />
              <div>
                <p className={s.metaLabel}>Latest occurrence</p>
                <p className={s.metaValue}>
                  {formatDate(event.geometry[0]?.date ?? "")}
                </p>
              </div>
            </div>

            {coords && (
              <div className={s.metaItem}>
                <MapPin size={15} className={s.metaIcon} />
                <div>
                  <p className={s.metaLabel}>Coordinates</p>
                  <p className={s.metaValue}>
                    {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
                  </p>
                </div>
              </div>
            )}

            <div className={s.metaItem}>
              <div>
                <p className={s.metaLabel}>Status</p>
                <p className={`${s.metaValue} ${event.closed ? s.closed : s.open}`}>
                  {event.closed ? "Closed" : "Active"}
                </p>
              </div>
            </div>
          </div>

          <div className={s.geometryList}>
            <h2 className={s.subTitle}>Event history ({event.geometry.length} records)</h2>
            <div className={s.geometryItems}>
              {event.geometry.slice(0, 10).map((geo, i) => (
                <div key={i} className={s.geoRow}>
                  <span className={s.geoDate}>{formatDate(geo.date)}</span>
                  {geo.magnitudeValue && (
                    <span className={s.geoMag}>
                      {geo.magnitudeValue} {geo.magnitudeUnit}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={s.sources}>
            <h2 className={s.subTitle}>Sources</h2>
            {event.sources.map((src) => (
              <a
                key={src.id}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.sourceLink}
              >
                {src.id}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
