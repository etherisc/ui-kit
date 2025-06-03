import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive typography system providing semantic HTML elements with consistent styling, responsive design, and accessibility features. Perfect for creating well-structured content hierarchies.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "list",
        "inlineCode",
        "lead",
        "large",
        "small",
        "muted",
      ],
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "muted",
        "destructive",
        "accent",
        "success",
        "warning",
        "info",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
    },
    truncate: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "This is a default paragraph with responsive typography and semantic HTML structure.",
  },
};

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-6">
      <TypographyH1>Heading 1 - Main Title</TypographyH1>
      <TypographyH2>Heading 2 - Section Title</TypographyH2>
      <TypographyH3>Heading 3 - Subsection Title</TypographyH3>
      <TypographyH4>Heading 4 - Minor Heading</TypographyH4>
      <TypographyH5>Heading 5 - Small Heading</TypographyH5>
      <TypographyH6>Heading 6 - Smallest Heading</TypographyH6>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <TypographyLead>
        This is a lead paragraph that introduces the main content. It's larger
        and more prominent than regular text.
      </TypographyLead>
      <TypographyP>
        This is a regular paragraph with proper line height and spacing. It
        provides the main body content with good readability for extended
        reading sessions.
      </TypographyP>
      <TypographyLarge>
        This is large text for emphasis without being a heading.
      </TypographyLarge>
      <TypographySmall>
        This is small text for disclaimers, captions, or secondary information.
      </TypographySmall>
      <TypographyMuted>
        This is muted text for less important information or subtle cues.
      </TypographyMuted>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography color="default">Default color text</Typography>
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="muted">Muted color text</Typography>
      <Typography color="destructive">Destructive color text</Typography>
      <Typography color="accent">Accent color text</Typography>
      <Typography color="success">Success color text</Typography>
      <Typography color="warning">Warning color text</Typography>
      <Typography color="info">Info color text</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <TypographyH4 className="mb-2">Left Aligned (Default)</TypographyH4>
        <Typography align="left">
          This text is left-aligned, which is the default alignment for most
          text content in left-to-right languages.
        </Typography>
      </div>
      <div>
        <TypographyH4 className="mb-2">Center Aligned</TypographyH4>
        <Typography align="center">
          This text is center-aligned, often used for headers, titles, or
          special callouts that need emphasis.
        </Typography>
      </div>
      <div>
        <TypographyH4 className="mb-2">Right Aligned</TypographyH4>
        <Typography align="right">
          This text is right-aligned, sometimes used for captions, credits, or
          in specific design layouts.
        </Typography>
      </div>
      <div>
        <TypographyH4 className="mb-2">Justified</TypographyH4>
        <Typography align="justify">
          This text is justified, meaning it stretches to fill the full width of
          its container by adjusting spacing between words. This creates clean,
          even margins on both sides and is often used in formal documents or
          publications.
        </Typography>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography weight="normal">Normal weight text (400)</Typography>
      <Typography weight="medium">Medium weight text (500)</Typography>
      <Typography weight="semibold">Semibold weight text (600)</Typography>
      <Typography weight="bold">Bold weight text (700)</Typography>
      <Typography weight="extrabold">Extra bold weight text (800)</Typography>
    </div>
  ),
};

export const BlockElements: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <TypographyH3>Blockquote Example</TypographyH3>
        <TypographyBlockquote>
          "The best way to predict the future is to create it. Typography is not
          just about making text look good, it's about making ideas accessible
          and communication clear."
          <footer className="mt-2 text-sm text-muted-foreground">
            — Design Philosophy
          </footer>
        </TypographyBlockquote>
      </div>

      <div>
        <TypographyH3>Unordered List</TypographyH3>
        <TypographyList>
          <li>First list item with clear hierarchy</li>
          <li>Second item with proper spacing</li>
          <li>Third item demonstrating consistency</li>
          <li>
            Fourth item with nested content:
            <TypographyList className="mt-2">
              <li>Nested item one</li>
              <li>Nested item two</li>
            </TypographyList>
          </li>
        </TypographyList>
      </div>

      <div>
        <TypographyH3>Ordered List</TypographyH3>
        <TypographyList ordered>
          <li>First step in the process</li>
          <li>Second step with detailed explanation</li>
          <li>Third step for completion</li>
          <li>Final step with summary</li>
        </TypographyList>
      </div>
    </div>
  ),
};

export const InlineElements: Story = {
  render: () => (
    <div className="space-y-4">
      <TypographyP>
        This paragraph contains{" "}
        <TypographyInlineCode>inline code</TypographyInlineCode> elements that
        are properly styled with monospace font and background highlighting for
        technical content.
      </TypographyP>

      <TypographyP>
        You can also use{" "}
        <TypographyInlineCode>
          npm install @etherisc/ui-kit
        </TypographyInlineCode>{" "}
        to install the package, or run{" "}
        <TypographyInlineCode>pnpm build</TypographyInlineCode> for development.
      </TypographyP>

      <TypographyP>
        The <TypographyInlineCode>Typography</TypographyInlineCode> component
        supports both <strong>bold text</strong> and <em>italic text</em> within
        paragraphs for natural emphasis.
      </TypographyP>
    </div>
  ),
};

export const TruncatedText: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <TypographyH4>Normal Text (Wraps)</TypographyH4>
        <Typography>
          This is a long paragraph that will wrap normally to multiple lines
          when it exceeds the container width, providing full readability of the
          content.
        </Typography>
      </div>

      <div>
        <TypographyH4>Truncated Text</TypographyH4>
        <Typography truncate>
          This is a long paragraph that will be truncated with an ellipsis when
          it exceeds the container width, useful for cards, lists, or other
          compact layouts.
        </Typography>
      </div>

      <div>
        <TypographyH4>Truncated Heading</TypographyH4>
        <TypographyH2 truncate>
          This is a very long heading that demonstrates truncation behavior
        </TypographyH2>
      </div>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-6">
      <TypographyH1>Responsive Typography</TypographyH1>
      <TypographyLead>
        Typography automatically adapts to different screen sizes. The heading
        above will be larger on desktop and appropriately scaled on mobile
        devices.
      </TypographyLead>

      <TypographyP>
        The responsive design ensures optimal readability across all devices
        while maintaining the visual hierarchy and design consistency. Line
        heights, font sizes, and spacing all adjust harmoniously.
      </TypographyP>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border rounded-lg">
          <TypographyH3>Mobile Optimized</TypographyH3>
          <TypographyP>
            Text scales appropriately for smaller screens while maintaining
            readability.
          </TypographyP>
        </div>
        <div className="p-4 border rounded-lg">
          <TypographyH3>Desktop Enhanced</TypographyH3>
          <TypographyP>
            Larger screens get enhanced typography with more space and larger
            text sizes.
          </TypographyP>
        </div>
      </div>
    </div>
  ),
};

export const ArticleLayout: Story = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <header>
        <TypographyH1>Understanding Design Systems</TypographyH1>
        <TypographyLead>
          A comprehensive guide to building consistent and scalable user
          interfaces with proper typography hierarchy.
        </TypographyLead>
        <TypographyMuted>
          Published on December 15, 2024 • 8 min read
        </TypographyMuted>
      </header>

      <TypographyP>
        Design systems are the foundation of modern user interface development.
        They provide a shared language between designers and developers,
        ensuring consistency across products and teams.
      </TypographyP>

      <TypographyH2>What Makes Typography Important?</TypographyH2>

      <TypographyP>
        Typography is more than just choosing fonts. It's about creating
        hierarchy, establishing rhythm, and guiding users through content. Good
        typography should be:
      </TypographyP>

      <TypographyList>
        <li>
          <strong>Readable</strong> - Easy to read at various sizes
        </li>
        <li>
          <strong>Accessible</strong> - Works for users with different abilities
        </li>
        <li>
          <strong>Consistent</strong> - Follows predictable patterns
        </li>
        <li>
          <strong>Scalable</strong> - Adapts to different screen sizes
        </li>
      </TypographyList>

      <TypographyH3>Implementation Best Practices</TypographyH3>

      <TypographyP>
        When implementing typography in your design system, consider using
        semantic HTML elements. For example, use{" "}
        <TypographyInlineCode>h1</TypographyInlineCode> for your main page
        title,
        <TypographyInlineCode>h2</TypographyInlineCode> for section headings,
        and so on.
      </TypographyP>

      <TypographyBlockquote>
        "Typography is the craft of endowing human language with a durable
        visual form."
        <footer className="mt-2">— Robert Bringhurst</footer>
      </TypographyBlockquote>

      <TypographyH3>Code Example</TypographyH3>

      <div className="p-4 bg-muted rounded-lg font-mono text-sm">
        <div>import {"{ Typography }"} from '@etherisc/ui-kit';</div>
        <div className="mt-2">&lt;Typography variant="h1"&gt;</div>
        <div className="ml-4">Welcome to Our Platform</div>
        <div>&lt;/Typography&gt;</div>
      </div>

      <TypographyP>
        This approach ensures that your content is both semantically meaningful
        and visually appealing, providing the best experience for all users.
      </TypographyP>
    </article>
  ),
};
