import { useState, useMemo, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { TableOfContents } from "./components/TableOfContents";
import { DragDropEditor } from "./components/DragDropEditor";
import type { Block, BlockType } from "./components/DragDropEditor";
import { AddComponentModal } from "./components/AddComponentModal";
import type { CustomComponentData } from "./components/AddComponentModal";
import { useMDX } from "./hooks/useMDX";
import { mdxComponents } from "./components/MDXComponents";
import { DEFAULT_MDX_CONTENT } from "./constants/defaultContent";
import { FileCode } from "lucide-react";
import "./App.css";

type ViewMode = "editor" | "preview" | "split";
type EditorMode = "code" | "visual";

function App() {
  const [mdxContent, setMdxContent] = useState(DEFAULT_MDX_CONTENT);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [editorMode, setEditorMode] = useState<EditorMode>("code");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("editor");
  const [isAddComponentModalOpen, setIsAddComponentModalOpen] = useState(false);

  // Blocks for drag-drop editor
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [customComponents, setCustomComponents] = useState<BlockType[]>([]);

  const components = useMemo(() => mdxComponents, []);
  const { content, error, isCompiling } = useMDX(mdxContent, components);

  // Convert blocks to MDX content
  const blocksToMdx = useCallback((blocks: Block[]): string => {
    return blocks.map((block) => block.content).join("\n");
  }, []);

  // Handle blocks change and sync to MDX content
  const handleBlocksChange = useCallback(
    (newBlocks: Block[]) => {
      setBlocks(newBlocks);
      setMdxContent(blocksToMdx(newBlocks));
    },
    [blocksToMdx]
  );

  // Handle adding custom component
  const handleAddCustomComponent = useCallback((data: CustomComponentData) => {
    const newComponent: BlockType = {
      id: `custom-${data.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`,
      type: data.name,
      label: data.label,
      icon: <FileCode size={16} />,
      category: "custom",
      template: data.template,
    };
    setCustomComponents((prev) => [...prev, newComponent]);
  }, []);

  // Switch between code and visual editor
  const handleEditorModeChange = useCallback(
    (mode: EditorMode) => {
      if (mode === "visual" && blocks.length === 0 && mdxContent) {
        // When switching to visual mode, create a single block with current content
        setBlocks([
          {
            id: "initial",
            type: "paragraph",
            content: mdxContent,
            props: {},
          },
        ]);
      }
      setEditorMode(mode);
    },
    [blocks.length, mdxContent]
  );

  return (
    <div className="app">
      {sidebarOpen && (
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      )}

      <div className="main">
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Getting Started"
          editorMode={editorMode}
          onEditorModeChange={handleEditorModeChange}
        />

        <div className="content">
          <div className={`panels ${viewMode}`}>
            {(viewMode === "editor" || viewMode === "split") && (
              <div className="editorPanel">
                {editorMode === "code" ? (
                  <Editor value={mdxContent} onChange={setMdxContent} />
                ) : (
                  <DragDropEditor
                    blocks={blocks}
                    onBlocksChange={handleBlocksChange}
                    customComponents={customComponents}
                    onAddCustomComponent={() =>
                      setIsAddComponentModalOpen(true)
                    }
                  />
                )}
              </div>
            )}

            {(viewMode === "preview" || viewMode === "split") && (
              <div className="previewPanel">
                <Preview
                  content={content}
                  error={error}
                  isCompiling={isCompiling}
                />
              </div>
            )}
          </div>

          {viewMode !== "editor" && <TableOfContents content={mdxContent} />}
        </div>
      </div>

      <AddComponentModal
        isOpen={isAddComponentModalOpen}
        onClose={() => setIsAddComponentModalOpen(false)}
        onAdd={handleAddCustomComponent}
      />
    </div>
  );
}

export default App;
