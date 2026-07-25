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
      subtitle="실시간 자연재해와 지구 위성 사진을 한눈에 확인하세요"
    >
      <div className={s.globePane}>
        {eventsLoading ? (
          <div className={s.paneLoading}>이벤트 데이터 로딩 중...</div>
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
              활성 자연재해{" "}
              {!eventsLoading && (
                <span className={s.count}>{events.length}</span>
              )}
            </h2>
            <div className={s.eventSummary}>
              {eventsLoading ? (
                <p className={s.loadingText}>로딩 중...</p>
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
                  전체 보기 ({events.length}개) →
                </button>
              )}
            </div>
          </div>

          <div className={s.section}>
            <h2 className={s.sectionTitle}>최신 지구 사진 (EPIC)</h2>
            {imagesLoading ? (
              <p className={s.loadingText}>로딩 중...</p>
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
