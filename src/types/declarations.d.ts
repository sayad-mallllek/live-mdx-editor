declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const oneDark: { [key: string]: React.CSSProperties };
}
