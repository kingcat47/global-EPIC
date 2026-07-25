import { getCategoryColor, getCategoryLabel } from "@/utils/eventUtils";
import s from "./styles.module.scss";

const CATEGORIES = [
  "wildfires",
  "floods",
  "severeStorms",
  "earthquakes",
  "volcanoes",
  "drought",
  "landslides",
  "snow",
  "seaLakeIce",
  "dustHaze",
  "waterColor",
  "tempExtremes",
  "manmade",
];

interface EventFilterBarProps {
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function EventFilterBar({ selected, onSelect }: EventFilterBarProps) {
  return (
    <div className={s.bar}>
      <button
        className={`${s.chip} ${selected === null ? s.active : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {CATEGORIES.map((cat) => {
        const color = getCategoryColor(cat);
        return (
          <button
            key={cat}
            className={`${s.chip} ${selected === cat ? s.active : ""}`}
            style={selected === cat ? { backgroundColor: color, borderColor: color } : {}}
            onClick={() => onSelect(selected === cat ? null : cat)}
          >
            {getCategoryLabel(cat)}
          </button>
        );
      })}
    </div>
  );
}
