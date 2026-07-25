import type { EpicImage } from "@/types/epic";
import { buildEpicImageUrl, formatDate } from "@/utils/eventUtils";
import s from "./styles.module.scss";

interface EpicPhotoCardProps {
  image: EpicImage;
}

export default function EpicPhotoCard({ image }: EpicPhotoCardProps) {
  const url = buildEpicImageUrl(image.image, image.date);

  return (
    <div className={s.card}>
      <div className={s.imageWrapper}>
        <img src={url} alt={image.caption} className={s.image} loading="lazy" />
      </div>
      <div className={s.info}>
        <p className={s.date}>{formatDate(image.date)}</p>
        <p className={s.caption}>{image.caption}</p>
        <p className={s.coords}>
          {image.centroid_coordinates.lat.toFixed(2)}°N,{" "}
          {image.centroid_coordinates.lon.toFixed(2)}°E
        </p>
      </div>
    </div>
  );
}
