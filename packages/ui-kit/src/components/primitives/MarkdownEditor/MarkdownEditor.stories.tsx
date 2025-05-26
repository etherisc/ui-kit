import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Primitives/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A secure markdown editor component with XSS protection and sanitization.

## Features
- Real-time markdown preview
- XSS protection with basic sanitization
- Accessible design with ARIA labels
- Edit/Preview toggle
- Keyboard shortcuts (Ctrl+P for preview toggle)

## Security
- Removes script tags and javascript: URLs
- Strips event handlers (onclick, onerror, etc.)
- Basic protection against common XSS vectors
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "The markdown content value",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when content changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the editor",
    },
    disabled: {
      control: "boolean",
      description: "Whether the editor is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the editor is read-only",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
    "aria-label": {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

// Interactive wrapper for stories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarkdownEditorWrapper(props: any) {
  const [value, setValue] = useState(props.value || "");

  return <MarkdownEditor {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    placeholder: "Enter markdown content...",
  },
};

export const WithContent: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: `# Hello World

This is a **markdown editor** with *italic text* and [links](https://example.com).

## Features

- Real-time preview
- Security sanitization
- Accessible design

### Code Example

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

> This is a blockquote with some important information.

1. Ordered list item
2. Another item
3. Final item`,
  },
};

export const SecurityDemo: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: `# Security Demo

This content demonstrates XSS protection:

## Malicious Content (will be sanitized):

<script>alert('This script will be removed')</script>

<img src="x" onerror="alert('This event handler will be removed')" alt="Test" />

[Malicious Link](javascript:alert('This will be sanitized'))

<div onclick="alert('Event handlers removed')">Click me</div>

## Safe Content (will be preserved):

**Bold text** and *italic text*

[Safe link](https://example.com)

\`\`\`html
<p>Code blocks are safe</p>
\`\`\`

- List items work fine
- No security issues here`,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates how the MarkdownEditor sanitizes malicious content while preserving safe markdown.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: "This editor is disabled",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: `# Read-Only Editor

This editor is in read-only mode. You can toggle to preview but cannot edit the content.

- Feature 1
- Feature 2
- Feature 3`,
    readOnly: true,
  },
};

export const CustomStyling: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: "# Custom Styled Editor\n\nThis editor has custom styling applied.",
    className: "border-2 border-blue-500 rounded-lg shadow-lg",
  },
};

export const Accessibility: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value:
      "# Accessibility Demo\n\nThis editor has proper ARIA labels and keyboard navigation.",
    "aria-label": "Accessible markdown editor",
    "aria-describedby": "editor-help",
  },
  decorators: [
    (Story) => (
      <div>
        <div id="editor-help" className="text-sm text-gray-600 mb-2">
          Use Ctrl+P to toggle between edit and preview modes. This editor
          sanitizes content for security.
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates accessibility features including ARIA labels and keyboard navigation.",
      },
    },
  },
};

export const LongContent: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: `# Long Content Demo

This demonstrates how the editor handles longer content with scrolling.

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Section 2

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Subsection 2.1

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

### Subsection 2.2

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## Section 3

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

### Code Example

\`\`\`typescript
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}
\`\`\`

## Lists

1. First item with a very long description that might wrap to multiple lines
2. Second item that also has quite a bit of text to demonstrate wrapping
3. Third item with even more content to show how the editor handles longer text

- Bullet point one
- Bullet point two with more text
- Bullet point three with extensive content that demonstrates text wrapping

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown parsing | Convert markdown to HTML | ✅ |
| XSS protection | Sanitize malicious content | ✅ |
| Accessibility | ARIA labels and keyboard nav | ✅ |
| Preview mode | Toggle between edit/preview | ✅ |

## Final Section

This is the end of the long content demo. The editor should handle all of this content gracefully with proper scrolling and layout.`,
  },
};

export const EmptyState: Story = {
  render: (args) => <MarkdownEditorWrapper {...args} />,
  args: {
    value: "",
    placeholder: "Start typing your markdown content here...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story shows the empty state of the editor with placeholder text.",
      },
    },
  },
};
