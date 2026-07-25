import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./styles.module.scss";

interface EpicDatePickerProps {
  dates: string[];
  selectedDate: string | undefined;
  onSelect: (date: string) => void;
}

export default function EpicDatePicker({ dates, selectedDate, onSelect }: EpicDatePickerProps) {
  if (dates.length === 0) return null;

  const currentIndex = selectedDate ? dates.indexOf(selectedDate) : dates.length - 1;
  const effective = currentIndex === -1 ? dates.length - 1 : currentIndex;

  const goNext = () => {
    if (effective < dates.length - 1) onSelect(dates[effective + 1]);
  };
  const goPrev = () => {
    if (effective > 0) onSelect(dates[effective - 1]);
  };

  return (
    <div className={s.picker}>
      <button className={s.arrow} onClick={goPrev} disabled={effective <= 0}>
        <ChevronLeft size={18} />
      </button>
      <div className={s.dateList}>
        {dates.slice(Math.max(0, effective - 2), effective + 3).map((d) => (
          <button
            key={d}
            className={`${s.dateChip} ${d === dates[effective] ? s.active : ""}`}
            onClick={() => onSelect(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <button className={s.arrow} onClick={goNext} disabled={effective >= dates.length - 1}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
