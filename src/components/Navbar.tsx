import { s } from "./styles";
import { tabs } from "../data/tabs";

interface NavbarProps {
  active: string;
  onTab: (tab: string) => void;
}

export default function Navbar({ active, onTab }: NavbarProps) {
  return (
    <div style={s.navbar}>
      {tabs.map((t) => (
        <div key={t.key} style={s.navItem(active === t.key)} onClick={() => onTab(t.key)} aria-current={active === t.key ? "page" : undefined}>
          <span style={s.navIcon(active === t.key)}>{t.icon}</span>
          <span style={s.navLabel(active === t.key)}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}