import { useState } from "react";
import {
  GripVertical,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image,
  Table,
  Minus,
  AlertCircle,
  LayoutGrid,
  Footprints,
  PanelTop,
  ChevronsUpDown,
  BadgeCheck,
  Copy,
  Settings,
} from "lucide-react";
import styles from "./DragDropEditor.module.css";

export interface BlockType {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  category: "basic" | "advanced" | "custom";
  defaultProps?: Record<string, unknown>;
  template: string;
}

export interface Block {
  id: string;
  type: string;
  content: string;
  props: Record<string, unknown>;
}

interface DragDropEditorProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
  customComponents: BlockType[];
  onAddCustomComponent: () => void;
}

const defaultBlockTypes: BlockType[] = [
  // Basic blocks
  {
    id: "paragraph",
    type: "paragraph",
    label: "Paragraph",
    icon: <Type size={16} />,
    category: "basic",
    template: "\nYour text here...\n",
  },
  {
    id: "heading1",
    type: "heading1",
    label: "Heading 1",
    icon: <Heading1 size={16} />,
    category: "basic",
    template: "\n# Heading 1\n",
  },
  {
    id: "heading2",
    type: "heading2",
    label: "Heading 2",
    icon: <Heading2 size={16} />,
    category: "basic",
    template: "\n## Heading 2\n",
  },
  {
    id: "heading3",
    type: "heading3",
    label: "Heading 3",
    icon: <Heading3 size={16} />,
    category: "basic",
    template: "\n### Heading 3\n",
  },
  {
    id: "bulletList",
    type: "bulletList",
    label: "Bullet List",
    icon: <List size={16} />,
    category: "basic",
    template: "\n- Item 1\n- Item 2\n- Item 3\n",
  },
  {
    id: "numberedList",
    type: "numberedList",
    label: "Numbered List",
    icon: <ListOrdered size={16} />,
    category: "basic",
    template: "\n1. First item\n2. Second item\n3. Third item\n",
  },
  {
    id: "quote",
    type: "quote",
    label: "Quote",
    icon: <Quote size={16} />,
    category: "basic",
    template: "\n> Your quote here...\n",
  },
  {
    id: "code",
    type: "code",
    label: "Code Block",
    icon: <Code size={16} />,
    category: "basic",
    template:
      '\n```javascript\n// Your code here\nconsole.log("Hello!");\n```\n',
  },
  {
    id: "image",
    type: "image",
    label: "Image",
    icon: <Image size={16} />,
    category: "basic",
    template: "\n![Alt text](https://via.placeholder.com/600x300)\n",
  },
  {
    id: "table",
    type: "table",
    label: "Table",
    icon: <Table size={16} />,
    category: "basic",
    template:
      "\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n",
  },
  {
    id: "divider",
    type: "divider",
    label: "Divider",
    icon: <Minus size={16} />,
    category: "basic",
    template: "\n---\n",
  },

  // Advanced MDX blocks
  {
    id: "callout-info",
    type: "callout",
    label: "Info Callout",
    icon: <AlertCircle size={16} />,
    category: "advanced",
    defaultProps: { type: "info" },
    template:
      '\n<Callout type="info" title="Info">\nYour information here...\n</Callout>\n',
  },
  {
    id: "callout-warning",
    type: "callout",
    label: "Warning Callout",
    icon: <AlertCircle size={16} />,
    category: "advanced",
    defaultProps: { type: "warning" },
    template:
      '\n<Callout type="warning" title="Warning">\nYour warning here...\n</Callout>\n',
  },
  {
    id: "callout-success",
    type: "callout",
    label: "Success Callout",
    icon: <AlertCircle size={16} />,
    category: "advanced",
    defaultProps: { type: "success" },
    template:
      '\n<Callout type="success" title="Success">\nYour success message here...\n</Callout>\n',
  },
  {
    id: "callout-error",
    type: "callout",
    label: "Error Callout",
    icon: <AlertCircle size={16} />,
    category: "advanced",
    defaultProps: { type: "error" },
    template:
      '\n<Callout type="error" title="Error">\nYour error message here...\n</Callout>\n',
  },
  {
    id: "card-group",
    type: "cardGroup",
    label: "Card Group",
    icon: <LayoutGrid size={16} />,
    category: "advanced",
    template:
      '\n<CardGroup cols={2}>\n  <Card title="Card 1" icon="⚡">\n    Card content here...\n  </Card>\n  <Card title="Card 2" icon="🎯">\n    Card content here...\n  </Card>\n</CardGroup>\n',
  },
  {
    id: "steps",
    type: "steps",
    label: "Steps",
    icon: <Footprints size={16} />,
    category: "advanced",
    template:
      '\n<Steps>\n  <Step title="Step 1">\n    First step description...\n  </Step>\n  <Step title="Step 2">\n    Second step description...\n  </Step>\n</Steps>\n',
  },
  {
    id: "tabs",
    type: "tabs",
    label: "Tabs",
    icon: <PanelTop size={16} />,
    category: "advanced",
    template:
      '\n<Tabs>\n  <Tab label="Tab 1">\n    Content for tab 1...\n  </Tab>\n  <Tab label="Tab 2">\n    Content for tab 2...\n  </Tab>\n</Tabs>\n',
  },
  {
    id: "accordion",
    type: "accordion",
    label: "Accordion",
    icon: <ChevronsUpDown size={16} />,
    category: "advanced",
    template:
      '\n<Accordion title="Click to expand">\nHidden content here...\n</Accordion>\n',
  },
  {
    id: "badge",
    type: "badge",
    label: "Badge",
    icon: <BadgeCheck size={16} />,
    category: "advanced",
    template: " <Badge>Label</Badge> ",
  },
];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function DragDropEditor({
  blocks,
  onBlocksChange,
  customComponents,
  onAddCustomComponent,
}: DragDropEditorProps) {
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    basic: true,
    advanced: true,
    custom: true,
  });
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const allBlockTypes = [...defaultBlockTypes, ...customComponents];

  const handleDragStart = (
    e: React.DragEvent,
    blockTypeId: string,
    isExisting: boolean = false,
    existingIndex?: number
  ) => {
    e.dataTransfer.setData("blockTypeId", blockTypeId);
    e.dataTransfer.setData("isExisting", String(isExisting));
    if (existingIndex !== undefined) {
      e.dataTransfer.setData("existingIndex", String(existingIndex));
    }
    setDraggedBlock(blockTypeId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const blockTypeId = e.dataTransfer.getData("blockTypeId");
    const isExisting = e.dataTransfer.getData("isExisting") === "true";
    const existingIndex = e.dataTransfer.getData("existingIndex");

    if (isExisting && existingIndex !== "") {
      // Reorder existing block
      const fromIndex = parseInt(existingIndex);
      const newBlocks = [...blocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      const adjustedDropIndex =
        fromIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newBlocks.splice(adjustedDropIndex, 0, movedBlock);
      onBlocksChange(newBlocks);
    } else {
      // Add new block
      const blockType = allBlockTypes.find((b) => b.id === blockTypeId);
      if (blockType) {
        const newBlock: Block = {
          id: generateId(),
          type: blockType.type,
          content: blockType.template,
          props: blockType.defaultProps || {},
        };
        const newBlocks = [...blocks];
        newBlocks.splice(dropIndex, 0, newBlock);
        onBlocksChange(newBlocks);
      }
    }

    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const blockTypeId = e.dataTransfer.getData("blockTypeId");
    const isExisting = e.dataTransfer.getData("isExisting") === "true";

    if (!isExisting) {
      const blockType = allBlockTypes.find((b) => b.id === blockTypeId);
      if (blockType) {
        const newBlock: Block = {
          id: generateId(),
          type: blockType.type,
          content: blockType.template,
          props: blockType.defaultProps || {},
        };
        onBlocksChange([...blocks, newBlock]);
      }
    }

    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  const handleDeleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onBlocksChange(newBlocks);
    setSelectedBlock(null);
  };

  const handleDuplicateBlock = (index: number) => {
    const blockToDuplicate = blocks[index];
    const duplicatedBlock: Block = {
      ...blockToDuplicate,
      id: generateId(),
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, duplicatedBlock);
    onBlocksChange(newBlocks);
  };

  const handleBlockContentChange = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], content };
    onBlocksChange(newBlocks);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getBlockTypeInfo = (type: string) => {
    return allBlockTypes.find((b) => b.type === type) || allBlockTypes[0];
  };

  const renderBlockPalette = (
    category: "basic" | "advanced" | "custom",
    title: string
  ) => {
    const categoryBlocks =
      category === "custom"
        ? customComponents
        : allBlockTypes.filter((b) => b.category === category);

    return (
      <div className={styles.category}>
        <button
          className={styles.categoryHeader}
          onClick={() => toggleCategory(category)}
        >
          {expandedCategories[category] ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
          <span>{title}</span>
          <span className={styles.categoryCount}>{categoryBlocks.length}</span>
        </button>
        {expandedCategories[category] && (
          <div className={styles.blockList}>
            {categoryBlocks.map((blockType) => (
              <div
                key={blockType.id}
                className={styles.blockType}
                draggable
                onDragStart={(e) => handleDragStart(e, blockType.id)}
              >
                <div className={styles.blockTypeIcon}>{blockType.icon}</div>
                <span>{blockType.label}</span>
              </div>
            ))}
            {category === "custom" && (
              <button
                className={styles.addCustomButton}
                onClick={onAddCustomComponent}
              >
                <Plus size={14} />
                <span>Add Component</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Block Palette */}
      <div className={styles.palette}>
        <div className={styles.paletteHeader}>
          <span>Components</span>
        </div>
        <div className={styles.paletteContent}>
          {renderBlockPalette("basic", "Basic Blocks")}
          {renderBlockPalette("advanced", "MDX Components")}
          {renderBlockPalette("custom", "Custom Components")}
        </div>
      </div>

      {/* Canvas */}
      <div
        className={styles.canvas}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnCanvas}
      >
        <div className={styles.canvasHeader}>
          <span>Document Canvas</span>
          <span className={styles.blockCount}>{blocks.length} blocks</span>
        </div>
        <div className={styles.canvasContent}>
          {blocks.length === 0 ? (
            <div className={styles.emptyCanvas}>
              <div className={styles.emptyIcon}>
                <Plus size={32} />
              </div>
              <p>Drag and drop components here</p>
              <p className={styles.emptyHint}>or click a component to add it</p>
            </div>
          ) : (
            <div className={styles.blocksList}>
              {blocks.map((block, index) => {
                const blockTypeInfo = getBlockTypeInfo(block.type);
                return (
                  <div key={block.id}>
                    {/* Drop zone before block */}
                    <div
                      className={`${styles.dropZone} ${
                        dragOverIndex === index ? styles.dropZoneActive : ""
                      }`}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                    />

                    {/* Block */}
                    <div
                      className={`${styles.block} ${
                        selectedBlock === block.id ? styles.blockSelected : ""
                      } ${
                        draggedBlock === block.id ? styles.blockDragging : ""
                      }`}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, block.id, true, index)
                      }
                      onClick={() => setSelectedBlock(block.id)}
                    >
                      <div className={styles.blockHandle}>
                        <GripVertical size={14} />
                      </div>
                      <div className={styles.blockIcon}>
                        {blockTypeInfo.icon}
                      </div>
                      <div className={styles.blockContent}>
                        <div className={styles.blockLabel}>
                          {blockTypeInfo.label}
                        </div>
                        <textarea
                          className={styles.blockTextarea}
                          value={block.content}
                          onChange={(e) =>
                            handleBlockContentChange(index, e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          rows={Math.min(block.content.split("\n").length, 8)}
                        />
                      </div>
                      <div className={styles.blockActions}>
                        <button
                          className={styles.blockAction}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateBlock(index);
                          }}
                          title="Duplicate"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          className={styles.blockAction}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Could open settings modal
                          }}
                          title="Settings"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          className={`${styles.blockAction} ${styles.blockActionDelete}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBlock(index);
                          }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Drop zone at the end */}
              <div
                className={`${styles.dropZone} ${
                  dragOverIndex === blocks.length ? styles.dropZoneActive : ""
                }`}
                onDragOver={(e) => handleDragOver(e, blocks.length)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, blocks.length)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
