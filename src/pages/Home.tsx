import { useNavigate } from "react-router-dom";
import { useEonetEvents } from "@/hooks/useEonetEvents";
import { useEpicImages } from "@/hooks/useEpicImages";
import { GlobeViewer } from "@/components/globe";
import { HeroSection } from "@/components/home";
import { buildEpicImageUrl } from "@/utils/eventUtils";
import s from "./Home.module.scss";

export default function Home() {
  const navigate = useNavigate();
  const { events, loading: eventsLoading } = useEonetEvents();
  const { images, loading: imagesLoading } = useEpicImages();

  const latestEpic = images[0];

  return (
    <HeroSection
      title="NASA Earth Watch"
      subtitle="Real-time natural disaster events and Earth satellite imagery, visualized."
    >
      <div className={s.globePane}>
        {eventsLoading ? (
          <div className={s.paneLoading}>Loading event data...</div>
        ) : (
          <GlobeViewer
            events={events}
            onEventClick={(id) => navigate(`/events/${id}`)}
          />
        )}
      </div>
      <div className={s.sidePane}>
        <div className={s.sidePaneInner}>
          <div className={s.section}>
            <h2 className={s.sectionTitle}>
              Active Events{" "}
              {!eventsLoading && (
                <span className={s.count}>{events.length}</span>
              )}
            </h2>
            <div className={s.eventSummary}>
              {eventsLoading ? (
                <p className={s.loadingText}>Loading...</p>
              ) : (
                events.slice(0, 5).map((ev) => (
                  <div
                    key={ev.id}
                    className={s.eventRow}
                    onClick={() => navigate(`/events/${ev.id}`)}
                  >
                    <span className={s.dot} />
                    <span className={s.eventName}>{ev.title}</span>
                  </div>
                ))
              )}
              {!eventsLoading && events.length > 5 && (
                <button
                  className={s.viewAll}
                  onClick={() => navigate("/events")}
                >
                  View all ({events.length}) →
                </button>
              )}
            </div>
          </div>

          <div className={s.section}>
            <h2 className={s.sectionTitle}>Latest Earth Photo (EPIC)</h2>
            {imagesLoading ? (
              <p className={s.loadingText}>Loading...</p>
            ) : latestEpic ? (
              <div className={s.epicPreview} onClick={() => navigate("/earth")}>
                <img
                  src={buildEpicImageUrl(latestEpic.image, latestEpic.date)}
                  alt={latestEpic.caption}
                  className={s.epicImage}
                />
                <p className={s.epicCaption}>{latestEpic.caption}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </HeroSection>
  );
}
