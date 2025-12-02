import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createElement,
} from "react";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { ReactNode, ComponentType } from "react";

interface UseMDXResult {
  content: ReactNode | null;
  error: string | null;
  isCompiling: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, ComponentType<any>>;

export function useMDX(
  source: string,
  components: MDXComponents = {}
): UseMDXResult {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const compileMDX = useCallback(
    async (mdxSource: string) => {
      setIsCompiling(true);
      setError(null);

      try {
        // Compile MDX to JavaScript
        const compiled = await compile(mdxSource, {
          outputFormat: "function-body",
          development: false,
        });

        // Run the compiled code
        const { default: MDXContent } = (await run(String(compiled), {
          ...runtime,
          baseUrl: import.meta.url,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as { default: ComponentType<{ components?: MDXComponents }> };

        // Render with components using createElement
        const rendered = createElement(MDXContent, { components });
        setContent(rendered);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        setContent(null);
      } finally {
        setIsCompiling(false);
      }
    },
    [components]
  );

  // Debounce compilation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      compileMDX(source);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [source, compileMDX]);

  return useMemo(
    () => ({ content, error, isCompiling }),
    [content, error, isCompiling]
  );
}
