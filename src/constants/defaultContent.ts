export const DEFAULT_MDX_CONTENT = `# Welcome to MDX Editor

This is a **live MDX editor** with custom components, styled like Mintlify.

## Getting Started

You can write standard markdown and also use custom React components!

<Callout type="info" title="What is MDX?">
MDX lets you use JSX in your markdown content. You can import components, such as interactive charts or alerts, and embed them within your content.
</Callout>

## Custom Components

### Callouts

Use callouts to highlight important information:

<Callout type="success" title="Success!">
Your changes have been saved successfully.
</Callout>

<Callout type="warning" title="Warning">
This action cannot be undone. Please proceed with caution.
</Callout>

<Callout type="error" title="Error">
Something went wrong. Please try again later.
</Callout>

<Callout type="tip" title="Pro Tip">
Use keyboard shortcuts to speed up your workflow!
</Callout>

### Cards

<CardGroup cols={2}>
  <Card title="Quick Start" icon="⚡">
    Get up and running in under 5 minutes with our quick start guide.
  </Card>
  <Card title="Components" icon="🧩">
    Explore all available components and their usage.
  </Card>
  <Card title="Theming" icon="🎨">
    Customize the look and feel of your documentation.
  </Card>
  <Card title="API Reference" icon="📚">
    Complete API documentation with examples.
  </Card>
</CardGroup>

### Code Blocks

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function greet(user: User): string {
  return "Hello, " + user.name + "!";
}
\`\`\`

### Steps

<Steps>
  <Step title="Install dependencies">
    Run npm install or pnpm install to install all required packages.
  </Step>
  <Step title="Configure your project">
    Update the configuration file with your settings.
  </Step>
  <Step title="Start developing">
    Run npm run dev to start the development server.
  </Step>
</Steps>

### Tabs

<Tabs>
  <Tab label="npm">
    npm install @mdx-js/mdx
  </Tab>
  <Tab label="yarn">
    yarn add @mdx-js/mdx
  </Tab>
  <Tab label="pnpm">
    pnpm add @mdx-js/mdx
  </Tab>
</Tabs>

### Accordion

<Accordion title="What is MDX?">
MDX is a format that lets you seamlessly write JSX in your Markdown documents. You can import components and export metadata.
</Accordion>

<Accordion title="How does live preview work?">
The editor compiles your MDX in real-time and renders the output in the preview pane. Any syntax errors will be displayed instead.
</Accordion>

### Badges

Status indicators: <Badge>Default</Badge> <Badge variant="success">Success</Badge> <Badge variant="warning">Warning</Badge> <Badge variant="error">Error</Badge>

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Live Preview | ✅ | Real-time compilation |
| Custom Components | ✅ | Extensible |
| Dark Theme | ✅ | Mintlify-inspired |
| Export | 🚧 | Coming soon |

## Lists

### Unordered List

- Write markdown naturally
- Insert custom components
- See live preview
- Export to various formats

### Ordered List

1. Create your content
2. Preview changes instantly
3. Publish when ready

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

---

Start editing to see MDX in action! 🚀
`;
