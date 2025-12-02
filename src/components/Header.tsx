import {
  PanelLeftClose,
  PanelLeftOpen,
  Eye,
  Code2,
  Columns2,
  Download,
  Share,
  Settings,
} from "lucide-react";
import styles from "./Header.module.css";

type ViewMode = "editor" | "preview" | "split";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  title: string;
}

export function Header({
  viewMode,
  onViewModeChange,
  sidebarOpen,
  onToggleSidebar,
  title,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.iconButton}
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelLeftOpen size={18} />
          )}
        </button>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbSection}>Documents</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbPage}>{title}</span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${
              viewMode === "editor" ? styles.viewButtonActive : ""
            }`}
            onClick={() => onViewModeChange("editor")}
            aria-label="Editor only"
          >
            <Code2 size={16} />
            <span>Editor</span>
          </button>
          <button
            className={`${styles.viewButton} ${
              viewMode === "split" ? styles.viewButtonActive : ""
            }`}
            onClick={() => onViewModeChange("split")}
            aria-label="Split view"
          >
            <Columns2 size={16} />
            <span>Split</span>
          </button>
          <button
            className={`${styles.viewButton} ${
              viewMode === "preview" ? styles.viewButtonActive : ""
            }`}
            onClick={() => onViewModeChange("preview")}
            aria-label="Preview only"
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconButton} aria-label="Export">
          <Download size={18} />
        </button>
        <button className={styles.iconButton} aria-label="Share">
          <Share size={18} />
        </button>
        <button className={styles.iconButton} aria-label="Settings">
          <Settings size={18} />
        </button>
        <button className={styles.publishButton}>Publish</button>
      </div>
    </header>
  );
}
