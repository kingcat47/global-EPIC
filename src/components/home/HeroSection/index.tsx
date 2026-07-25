import type { ReactNode } from "react";
import s from "./styles.module.scss";

interface HeroSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ children, title, subtitle }: HeroSectionProps) {
  return (
    <section className={s.hero}>
      {(title || subtitle) && (
        <div className={s.text}>
          {title && <h1 className={s.title}>{title}</h1>}
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={s.content}>{children}</div>
    </section>
  );
}
