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
          <h1 className={s.title}>지구 사진 갤러리</h1>
          <p className={s.subtitle}>
            NASA EPIC 위성이 촬영한 지구의 모습을 날짜별로 감상하세요.
          </p>
        </div>

        <EpicDatePicker
          dates={availableDates}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        {loading && <p className={s.loading}>사진 로딩 중...</p>}
        {error && <p className={s.error}>오류: {error}</p>}
        {!loading && !error && (
          <>
            <p className={s.count}>{images.length}장의 사진</p>
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
