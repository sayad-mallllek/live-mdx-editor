import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import styles from "./Preview.module.css";

interface PreviewProps {
  content: ReactNode | null;
  error: string | null;
  isCompiling: boolean;
}

export function Preview({ content, error, isCompiling }: PreviewProps) {
  if (isCompiling && !content && !error) {
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={24} />
        <span>Compiling MDX...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorHeader}>
          <AlertCircle size={20} />
          <span>Compilation Error</span>
        </div>
        <pre className={styles.errorMessage}>{error}</pre>
      </div>
    );
  }

  return (
    <div className={styles.preview}>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
