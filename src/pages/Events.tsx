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
          <h1 className={s.title}>Natural Disaster Events</h1>
          <p className={s.subtitle}>
            Active natural disaster events currently tracked by NASA EONET.
          </p>
        </div>

        <EventFilterBar
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading && <p className={s.loading}>Loading events...</p>}
        {error && <p className={s.error}>Error: {error}</p>}
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
