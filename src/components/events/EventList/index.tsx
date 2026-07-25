import type { ReactNode } from "react";
import s from "./styles.module.scss";

interface EventListProps {
  children: ReactNode;
  isEmpty?: boolean;
}

export default function EventList({ children, isEmpty }: EventListProps) {
  if (isEmpty) {
    return (
      <div className={s.empty}>
        <p>No active events found for this category.</p>
      </div>
    );
  }

  return <div className={s.list}>{children}</div>;
}
