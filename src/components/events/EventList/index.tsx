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
        <p>해당 카테고리의 활성 이벤트가 없습니다.</p>
      </div>
    );
  }

  return <div className={s.list}>{children}</div>;
}
