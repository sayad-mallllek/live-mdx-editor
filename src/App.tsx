import { useState, useMemo } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { TableOfContents } from "./components/TableOfContents";
import { useMDX } from "./hooks/useMDX";
import { mdxComponents } from "./components/MDXComponents";
import { DEFAULT_MDX_CONTENT } from "./constants/defaultContent";
import "./App.css";

type ViewMode = "editor" | "preview" | "split";

function App() {
  const [mdxContent, setMdxContent] = useState(DEFAULT_MDX_CONTENT);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("editor");

  const components = useMemo(() => mdxComponents, []);
  const { content, error, isCompiling } = useMDX(mdxContent, components);

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
        />

        <div className="content">
          <div className={`panels ${viewMode}`}>
            {(viewMode === "editor" || viewMode === "split") && (
              <div className="editorPanel">
                <Editor value={mdxContent} onChange={setMdxContent} />
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
    </div>
  );
}

export default App;
