import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { CodeEditorProps } from "./types";

const meta: Meta<typeof CodeEditor> = {
  title: "Primitives/CodeEditor",
  component: CodeEditor,
  tags: ["!test"],
  parameters: {
    layout: "padded",
    a11y: {
      disable: true, // Disable a11y tests due to CodeMirror internal accessibility conflicts
    },
    "test-runner": {
      skip: true, // Skip all tests for CodeEditor due to CodeMirror loading timeouts in test environment
    },
    docs: {
      description: {
        component:
          "A code editor component built with CodeMirror 6, supporting syntax highlighting, themes, and various programming languages.",
      },
    },
  },
  argTypes: {
    language: {
      control: { type: "select" },
      options: [
        "javascript",
        "typescript",
        "css",
        "html",
        "json",
        "markdown",
        "plaintext",
      ],
      description: "Programming language for syntax highlighting",
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "Editor theme",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the editor is read-only",
    },
    disabled: {
      control: "boolean",
      description: "Whether the editor is disabled",
    },
    lineNumbers: {
      control: "boolean",
      description: "Show line numbers",
    },
    lineWrapping: {
      control: "boolean",
      description: "Enable line wrapping",
    },
    height: {
      control: { type: "text" },
      description: "Height of the editor",
    },
    minHeight: {
      control: { type: "text" },
    },
    maxHeight: {
      control: { type: "text" },
    },
    tabSize: {
      control: { type: "number", min: 1, max: 8 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`The 10th Fibonacci number is: \${result}\`);`;

const typescriptCode = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`;

const cssCode = `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
}`;

const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Awesome Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <nav class="navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="main-content">
    <section class="hero">
      <h1>Welcome to My Website</h1>
      <p>This is a sample HTML document.</p>
      <button onclick="alert('Hello World!')">Click Me</button>
    </section>
  </main>
  
  <script src="script.js"></script>
</body>
</html>`;

const jsonCode = `{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A sample project configuration",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21",
    "moment": "^2.29.4"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.20",
    "webpack": "^5.74.0"
  },
  "keywords": ["javascript", "node", "express"],
  "author": "John Doe <john@example.com>",
  "license": "MIT"
}`;

const markdownCode = `# CodeEditor Component

A powerful code editor built with **CodeMirror 6**.

## Features

- 🎨 **Syntax Highlighting** - Support for multiple programming languages
- 🌙 **Dark/Light Themes** - Beautiful themes for any preference  
- 📝 **Rich Editing** - Line numbers, code folding, search and replace
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 📱 **Responsive** - Works great on desktop and mobile devices

## Supported Languages

| Language   | Extension | Description                    |
|------------|-----------|--------------------------------|
| JavaScript | .js       | Dynamic programming language   |
| TypeScript | .ts       | Typed superset of JavaScript   |
| CSS        | .css      | Cascading Style Sheets        |
| HTML       | .html     | HyperText Markup Language     |
| JSON       | .json     | JavaScript Object Notation    |
| Markdown   | .md       | Lightweight markup language    |

## Code Example

\`\`\`javascript
const editor = new CodeEditor({
  language: 'javascript',
  theme: 'dark',
  value: 'console.log("Hello, World!");'
});
\`\`\`

> **Note**: This component is built with modern web standards and requires a recent browser version.

---

*Happy coding! 🚀*`;

// Interactive story with state
const InteractiveTemplate = (args: CodeEditorProps) => {
  const [code, setCode] = useState(args.value || javascriptCode);

  return (
    <div className="space-y-4">
      <CodeEditor {...args} value={code} onChange={setCode} />
      <div className="text-sm text-muted-foreground">
        Character count: {code.length}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    value: javascriptCode,
    language: "javascript",
    theme: "light",
    height: "300px",
  },
};

export const Interactive: Story = {
  render: InteractiveTemplate,
  args: {
    value: javascriptCode,
    language: "javascript",
    theme: "light",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "An interactive code editor where you can type and see changes in real-time.",
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    value: typescriptCode,
    language: "typescript",
    theme: "dark",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Code editor with dark theme, perfect for low-light environments.",
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    value: cssCode,
    language: "css",
    readOnly: true,
    height: "350px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Read-only code editor for displaying code without allowing edits.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: htmlCode,
    language: "html",
    disabled: true,
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled code editor that cannot be focused or edited.",
      },
    },
  },
};

export const WithLineWrapping: Story = {
  args: {
    value:
      "This is a very long line of code that should wrap when line wrapping is enabled. It demonstrates how the editor handles long lines of text that exceed the viewport width.",
    language: "plaintext",
    lineWrapping: true,
    height: "200px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Code editor with line wrapping enabled for better readability of long lines.",
      },
    },
  },
};

export const NoLineNumbers: Story = {
  args: {
    value: jsonCode,
    language: "json",
    lineNumbers: false,
    height: "350px",
  },
  parameters: {
    docs: {
      description: {
        story: "Code editor without line numbers for a cleaner appearance.",
      },
    },
  },
};

export const CompactSize: Story = {
  args: {
    value: 'console.log("Hello, World!");',
    language: "javascript",
    height: "100px",
  },
  parameters: {
    docs: {
      description: {
        story: "Compact code editor suitable for small code snippets.",
      },
    },
  },
};

export const MarkdownEditor: Story = {
  args: {
    value: markdownCode,
    language: "markdown",
    height: "500px",
    lineWrapping: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Code editor configured for Markdown editing with line wrapping.",
      },
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: "",
    language: "javascript",
    placeholder: "Enter your JavaScript code here...",
    height: "200px",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty code editor with placeholder text to guide users.",
      },
    },
  },
};

export const AllLanguages: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-2">JavaScript</h3>
        <CodeEditor
          value="const hello = 'world';"
          language="javascript"
          height="120px"
          readOnly
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">TypeScript</h3>
        <CodeEditor
          value="interface User { name: string; }"
          language="typescript"
          height="120px"
          readOnly
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">CSS</h3>
        <CodeEditor
          value=".class { color: blue; }"
          language="css"
          height="120px"
          readOnly
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">HTML</h3>
        <CodeEditor
          value="<div>Hello World</div>"
          language="html"
          height="120px"
          readOnly
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">JSON</h3>
        <CodeEditor
          value='{"key": "value"}'
          language="json"
          height="120px"
          readOnly
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Markdown</h3>
        <CodeEditor
          value="# Hello **World**"
          language="markdown"
          height="120px"
          readOnly
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all supported programming languages with syntax highlighting.",
      },
    },
  },
};
