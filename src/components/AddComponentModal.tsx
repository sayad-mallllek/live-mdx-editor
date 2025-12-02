import { useState } from "react";
import { X, Code2, FileCode, Sparkles } from "lucide-react";
import styles from "./AddComponentModal.module.css";

interface AddComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (component: CustomComponentData) => void;
}

export interface CustomComponentData {
  name: string;
  label: string;
  template: string;
  description: string;
}

export function AddComponentModal({
  isOpen,
  onClose,
  onAdd,
}: AddComponentModalProps) {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState(
    "<MyComponent>\n  Content here...\n</MyComponent>"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && label && template) {
      onAdd({
        name,
        label,
        template: `\n${template}\n`,
        description,
      });
      // Reset form
      setName("");
      setLabel("");
      setDescription("");
      setTemplate("<MyComponent>\n  Content here...\n</MyComponent>");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <FileCode size={20} />
            <span>Add Custom Component</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Component Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., MyButton"
              required
            />
            <span className={styles.hint}>Used internally as identifier</span>
          </div>

          <div className={styles.field}>
            <label htmlFor="label">Display Label</label>
            <input
              id="label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Custom Button"
              required
            />
            <span className={styles.hint}>Shown in the component palette</span>
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description (optional)</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A customizable button component"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="template">
              <Code2 size={14} />
              <span>MDX Template</span>
            </label>
            <textarea
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="<MyComponent prop='value'>&#10;  Content...&#10;</MyComponent>"
              rows={6}
              required
            />
            <span className={styles.hint}>
              The JSX code that will be inserted when this component is added
            </span>
          </div>

          <div className={styles.info}>
            <Sparkles size={16} />
            <p>
              Make sure your component is registered in the MDXComponents.tsx
              file for it to render correctly in the preview.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
