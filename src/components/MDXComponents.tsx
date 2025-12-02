import type { ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Lightbulb,
  Zap,
  Star,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./MDXComponents.module.css";

// Callout component
interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "tip";
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const icons = {
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
    error: <AlertCircle size={20} />,
    success: <CheckCircle2 size={20} />,
    tip: <Lightbulb size={20} />,
  };

  return (
    <div
      className={`${styles.callout} ${
        styles[`callout${type.charAt(0).toUpperCase() + type.slice(1)}`]
      }`}
    >
      <div className={styles.calloutIcon}>{icons[type]}</div>
      <div className={styles.calloutContent}>
        {title && <div className={styles.calloutTitle}>{title}</div>}
        <div className={styles.calloutBody}>{children}</div>
      </div>
    </div>
  );
}

// Card component
interface CardProps {
  title?: string;
  icon?: ReactNode;
  href?: string;
  children: ReactNode;
}

export function Card({ title, icon, href, children }: CardProps) {
  const content = (
    <div className={styles.card}>
      {icon && <div className={styles.cardIcon}>{icon}</div>}
      <div className={styles.cardContent}>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        <div className={styles.cardBody}>{children}</div>
      </div>
      {href && <ArrowRight size={16} className={styles.cardArrow} />}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles.cardLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}

// Card Group
interface CardGroupProps {
  cols?: 1 | 2 | 3;
  children: ReactNode;
}

export function CardGroup({ cols = 2, children }: CardGroupProps) {
  return (
    <div
      className={styles.cardGroup}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {children}
    </div>
  );
}

// Code Block with copy button
interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  children,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeBlock}>
      {filename && (
        <div className={styles.codeHeader}>
          <span className={styles.codeFilename}>{filename}</span>
          <button className={styles.copyButton} onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      {!filename && (
        <button className={styles.copyButtonFloat} onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: filename ? "0 0 8px 8px" : "8px",
          background: "#161b22",
          fontSize: "14px",
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

// Tabs component
interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

export function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = Array.isArray(children) ? children : [children];

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              index === activeIndex ? styles.tabButtonActive : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex]}</div>
    </div>
  );
}

// Steps component
interface StepProps {
  title: string;
  children: ReactNode;
}

interface StepsProps {
  children: React.ReactElement<StepProps>[];
}

export function Step({ title, children }: StepProps) {
  return (
    <div className={styles.step}>
      <div className={styles.stepTitle}>{title}</div>
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
}

export function Steps({ children }: StepsProps) {
  const steps = Array.isArray(children) ? children : [children];

  return (
    <div className={styles.steps}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepItem}>
          <div className={styles.stepNumber}>{index + 1}</div>
          <div className={styles.stepBody}>{step}</div>
        </div>
      ))}
    </div>
  );
}

// Feature badge
interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${
        styles[`badge${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      }`}
    >
      {children}
    </span>
  );
}

// Accordion
interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ArrowRight
          size={16}
          className={`${styles.accordionIcon} ${
            isOpen ? styles.accordionIconOpen : ""
          }`}
        />
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
}

// Icon wrapper
interface IconProps {
  name: "zap" | "star" | "info" | "check" | "external";
  size?: number;
}

export function Icon({ name, size = 16 }: IconProps) {
  const icons = {
    zap: <Zap size={size} />,
    star: <Star size={size} />,
    info: <Info size={size} />,
    check: <CheckCircle2 size={size} />,
    external: <ExternalLink size={size} />,
  };

  return <span className={styles.icon}>{icons[name]}</span>;
}

// Export all components for MDX usage
export const mdxComponents = {
  Callout,
  Card,
  CardGroup,
  CodeBlock,
  Tabs,
  Tab,
  Steps,
  Step,
  Badge,
  Accordion,
  Icon,
  // Override default HTML elements
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={styles.h1} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={styles.h2} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={styles.h3} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={styles.h4} {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={styles.p} {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={styles.ul} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={styles.ol} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={styles.li} {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={styles.blockquote} {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className={styles.tableWrapper}>
      <table className={styles.table} {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={styles.th} {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={styles.td} {...props}>
      {children}
    </td>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={styles.hr} {...props} />
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <ExternalLink size={12} className={styles.linkIcon} />
    </a>
  ),
};
