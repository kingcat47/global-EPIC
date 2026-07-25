import { useState } from "react";
import { Outlet, useMatch } from "react-router-dom";
import { useEonetEvents } from "@/hooks/useEonetEvents";
import { EventCard, EventList, EventFilterBar } from "@/components/events";
import s from "./Events.module.scss";

export default function Events() {
  const { events, loading, error } = useEonetEvents();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isDetail = useMatch("/events/:id");

  if (isDetail) {
    return <Outlet />;
  }

  const filtered = selectedCategory
    ? events.filter((ev) =>
        ev.categories.some((cat) => cat.id === selectedCategory)
      )
    : events;

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <div className={s.header}>
          <h1 className={s.title}>자연재해 이벤트</h1>
          <p className={s.subtitle}>
            NASA EONET이 추적 중인 실시간 자연재해 이벤트 목록입니다.
          </p>
        </div>

        <EventFilterBar
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading && <p className={s.loading}>이벤트 로딩 중...</p>}
        {error && <p className={s.error}>오류: {error}</p>}
        {!loading && !error && (
          <EventList isEmpty={filtered.length === 0}>
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </EventList>
        )}
      </div>
    </div>
  );
}
