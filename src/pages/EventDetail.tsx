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
          <p className={s.loading}>이벤트 정보 로딩 중...</p>
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
            이벤트 목록으로
          </Link>
          <p className={s.error}>{error ?? "이벤트를 찾을 수 없습니다."}</p>
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
          이벤트 목록으로
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
                <p className={s.metaLabel}>최근 발생</p>
                <p className={s.metaValue}>
                  {formatDate(event.geometry[0]?.date ?? "")}
                </p>
              </div>
            </div>

            {coords && (
              <div className={s.metaItem}>
                <MapPin size={15} className={s.metaIcon} />
                <div>
                  <p className={s.metaLabel}>좌표</p>
                  <p className={s.metaValue}>
                    {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
                  </p>
                </div>
              </div>
            )}

            <div className={s.metaItem}>
              <div>
                <p className={s.metaLabel}>상태</p>
                <p className={`${s.metaValue} ${event.closed ? s.closed : s.open}`}>
                  {event.closed ? "종료" : "활성"}
                </p>
              </div>
            </div>
          </div>

          <div className={s.geometryList}>
            <h2 className={s.subTitle}>이벤트 기록 ({event.geometry.length}개)</h2>
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
            <h2 className={s.subTitle}>출처</h2>
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
