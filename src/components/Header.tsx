import {
  PanelLeftClose,
  PanelLeftOpen,
  Eye,
  Code2,
  Columns2,
  Download,
  Share,
  Settings,
  MousePointer2,
} from "lucide-react";
import styles from "./Header.module.css";

type ViewMode = "editor" | "preview" | "split";
type EditorMode = "code" | "visual";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  title: string;
  editorMode?: EditorMode;
  onEditorModeChange?: (mode: EditorMode) => void;
}

export function Header({
  viewMode,
  onViewModeChange,
  sidebarOpen,
  onToggleSidebar,
  title,
  editorMode = "code",
  onEditorModeChange,
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
        {/* Editor Mode Toggle */}
        {onEditorModeChange && (
          <div className={styles.editorModeToggle}>
            <button
              className={`${styles.modeButton} ${
                editorMode === "code" ? styles.modeButtonActive : ""
              }`}
              onClick={() => onEditorModeChange("code")}
              aria-label="Code editor"
            >
              <Code2 size={14} />
              <span>Code</span>
            </button>
            <button
              className={`${styles.modeButton} ${
                editorMode === "visual" ? styles.modeButtonActive : ""
              }`}
              onClick={() => onEditorModeChange("visual")}
              aria-label="Visual editor"
            >
              <MousePointer2 size={14} />
              <span>Visual</span>
            </button>
          </div>
        )}

        <div className={styles.divider} />

        {/* View Mode Toggle */}
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
