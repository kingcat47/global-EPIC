import { getCategoryColor, getCategoryLabel } from "@/utils/eventUtils";
import s from "./styles.module.scss";

interface CategoryBadgeProps {
  categoryId: string;
}

export default function CategoryBadge({ categoryId }: CategoryBadgeProps) {
  const color = getCategoryColor(categoryId);
  const label = getCategoryLabel(categoryId);

  return (
    <span className={s.badge} style={{ backgroundColor: color + "22", color }}>
      {label}
    </span>
  );
}
