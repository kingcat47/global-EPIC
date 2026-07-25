import { useState } from "react";
import { useEpicImages } from "@/hooks/useEpicImages";
import { EpicPhotoCard, EpicDatePicker } from "@/components/epic";
import s from "./EarthGallery.module.scss";

export default function EarthGallery() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const { images, availableDates, loading, error } = useEpicImages(selectedDate);

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <div className={s.header}>
          <h1 className={s.title}>Earth Photo Gallery</h1>
          <p className={s.subtitle}>
            Browse daily Earth imagery captured by NASA's EPIC satellite camera aboard DSCOVR.
          </p>
        </div>

        <EpicDatePicker
          dates={availableDates}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        {loading && <p className={s.loading}>Loading photos...</p>}
        {error && <p className={s.error}>Error: {error}</p>}
        {!loading && !error && (
          <>
            <p className={s.count}>{images.length} photo{images.length !== 1 ? "s" : ""}</p>
            <div className={s.grid}>
              {images.map((img) => (
                <EpicPhotoCard key={img.identifier} image={img} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
