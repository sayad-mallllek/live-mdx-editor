import {
  FileText,
  Settings,
  Palette,
  Layout,
  Code2,
  Sparkles,
  BookOpen,
  Component,
  Search,
} from "lucide-react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "editor", label: "Editor", icon: FileText },
  { id: "components", label: "Components", icon: Component },
  { id: "templates", label: "Templates", icon: Layout },
];

const organizeItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "themes", label: "Themes", icon: Palette },
];

const customizeItems = [
  { id: "code", label: "Code Blocks", icon: Code2 },
  { id: "ai", label: "AI Assistance", icon: Sparkles },
  { id: "docs", label: "Documentation", icon: BookOpen },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Sparkles size={20} />
        </div>
        <span className={styles.logoText}>MDX Editor</span>
      </div>

      <div className={styles.search}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
        <span className={styles.searchShortcut}>⌘K</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Sparkles size={14} />
            Get started
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${
                activeSection === item.id ? styles.navItemActive : ""
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Settings size={14} />
            Organize
          </div>
          {organizeItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${
                activeSection === item.id ? styles.navItemActive : ""
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Palette size={14} />
            Customize
          </div>
          {customizeItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${
                activeSection === item.id ? styles.navItemActive : ""
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.footer}>
        <button className={styles.askAI}>
          <Sparkles size={16} />
          Ask AI
        </button>
      </div>
    </aside>
  );
}
