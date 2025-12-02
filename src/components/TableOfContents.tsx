import { useMemo } from "react";
import { List } from "lucide-react";
import styles from "./TableOfContents.module.css";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  activeId?: string;
}

function extractHeadings(markdown: string): TOCItem[] {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}

export function TableOfContents({ content, activeId }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className={styles.toc}>
      <div className={styles.header}>
        <List size={14} />
        <span>On this page</span>
      </div>
      <nav className={styles.nav}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`${styles.link} ${styles[`level${heading.level}`]} ${
              activeId === heading.id ? styles.linkActive : ""
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
