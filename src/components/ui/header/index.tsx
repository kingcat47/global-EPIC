import { Globe, AlertTriangle, Image } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HeaderItem from "@/components/ui/header/header-item";

import s from "./styles.module.scss";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className={s.header}>
      <div className={s.header_content}>
        <div className={s.right}>
          <Link to="/" className={s.logoLink}>
            <span className={s.brand}>🌍 NASA Earth Watch</span>
          </Link>
          <nav className={s.items} aria-label="주요 메뉴">
            <HeaderItem
              text={"홈"}
              icon={Globe}
              href={"/"}
              isActive={pathname === "/"}
            />
            <HeaderItem
              text={"이벤트"}
              icon={AlertTriangle}
              href={"/events"}
              isActive={pathname.startsWith("/events")}
            />
            <HeaderItem
              text={"지구사진"}
              icon={Image}
              href={"/earth"}
              isActive={pathname.startsWith("/earth")}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
