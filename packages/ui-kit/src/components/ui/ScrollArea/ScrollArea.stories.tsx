import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Code,
  Image as ImageIcon,
  FileText,
  Folder,
  Music,
} from "lucide-react";

import { ScrollArea, ScrollBar } from "./ScrollArea";
import { Separator } from "../Separator/Separator";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A scroll area component that provides custom styled scrollbars and smooth scrolling behavior across different browsers. Built on Radix UI primitives.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="text-sm">
            v1.2.0-beta.{i}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const VerticalScrolling: Story = {
  render: () => (
    <ScrollArea className="h-96 w-80 rounded-md border">
      <div className="p-4 space-y-4">
        <h4 className="text-lg font-semibold">Long Content Example</h4>
        <p className="text-sm text-muted-foreground">
          This is a demonstration of vertical scrolling within a constrained
          height container.
        </p>

        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Section {i + 1}</h5>
              <Badge variant="outline">v{i + 1}.0</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            {i < 29 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScrolling: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="shrink-0 w-40 h-32 rounded-md border bg-muted flex items-center justify-center"
          >
            <div className="text-center">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Image {i + 1}</p>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-72 w-96 rounded-md border">
      <div className="w-[800px] p-4">
        <h4 className="mb-4 text-lg font-semibold">Wide and Tall Content</h4>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              className="h-24 w-full rounded-md border bg-muted flex items-center justify-center"
            >
              <span className="text-sm font-medium">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <ScrollArea className="h-80 w-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Project Files</h4>
        <div className="space-y-1">
          {[
            { name: "src", type: "folder", items: 12 },
            { name: "components", type: "folder", items: 8 },
            { name: "Button.tsx", type: "file", ext: "tsx" },
            { name: "Card.tsx", type: "file", ext: "tsx" },
            { name: "Dialog.tsx", type: "file", ext: "tsx" },
            { name: "Input.tsx", type: "file", ext: "tsx" },
            { name: "utils", type: "folder", items: 3 },
            { name: "cn.ts", type: "file", ext: "ts" },
            { name: "format.ts", type: "file", ext: "ts" },
            { name: "validate.ts", type: "file", ext: "ts" },
            { name: "hooks", type: "folder", items: 5 },
            { name: "useLocalStorage.ts", type: "file", ext: "ts" },
            { name: "useDebounce.ts", type: "file", ext: "ts" },
            { name: "useToggle.ts", type: "file", ext: "ts" },
            { name: "styles", type: "folder", items: 4 },
            { name: "globals.css", type: "file", ext: "css" },
            { name: "components.css", type: "file", ext: "css" },
            { name: "theme.css", type: "file", ext: "css" },
            { name: "package.json", type: "file", ext: "json" },
            { name: "tsconfig.json", type: "file", ext: "json" },
            { name: "README.md", type: "file", ext: "md" },
            { name: "LICENSE", type: "file", ext: "" },
            { name: ".gitignore", type: "file", ext: "" },
            { name: ".eslintrc.js", type: "file", ext: "js" },
            { name: "vite.config.ts", type: "file", ext: "ts" },
            { name: "vitest.config.ts", type: "file", ext: "ts" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 py-1 px-2 rounded hover:bg-muted/50 cursor-pointer"
            >
              {item.type === "folder" ? (
                <Folder className="h-4 w-4 text-blue-500" />
              ) : item.ext === "tsx" || item.ext === "ts" ? (
                <Code className="h-4 w-4 text-blue-600" />
              ) : item.ext === "css" ? (
                <FileText className="h-4 w-4 text-pink-500" />
              ) : item.ext === "json" ? (
                <FileText className="h-4 w-4 text-yellow-600" />
              ) : item.ext === "md" ? (
                <FileText className="h-4 w-4 text-gray-600" />
              ) : (
                <FileText className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm">{item.name}</span>
              {item.type === "folder" && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {item.items} items
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

export const MusicPlaylist: Story = {
  render: () => (
    <ScrollArea className="h-80 w-80 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Now Playing</h4>
        <div className="space-y-2">
          {[
            { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
            { title: "Hotel California", artist: "Eagles", duration: "6:30" },
            {
              title: "Stairway to Heaven",
              artist: "Led Zeppelin",
              duration: "8:02",
            },
            {
              title: "Sweet Child O' Mine",
              artist: "Guns N' Roses",
              duration: "5:03",
            },
            { title: "Imagine", artist: "John Lennon", duration: "3:07" },
            {
              title: "Billie Jean",
              artist: "Michael Jackson",
              duration: "4:54",
            },
            {
              title: "Like a Rolling Stone",
              artist: "Bob Dylan",
              duration: "6:13",
            },
            {
              title: "Smells Like Teen Spirit",
              artist: "Nirvana",
              duration: "5:01",
            },
            { title: "Purple Haze", artist: "Jimi Hendrix", duration: "2:50" },
            {
              title: "Good Vibrations",
              artist: "The Beach Boys",
              duration: "3:36",
            },
            {
              title: "What's Going On",
              artist: "Marvin Gaye",
              duration: "3:53",
            },
            { title: "Respect", artist: "Aretha Franklin", duration: "2:28" },
            { title: "Hey Jude", artist: "The Beatles", duration: "7:11" },
            {
              title: "Johnny B. Goode",
              artist: "Chuck Berry",
              duration: "2:38",
            },
            {
              title: "Born to Run",
              artist: "Bruce Springsteen",
              duration: "4:30",
            },
            {
              title: "Bridge Over Troubled Water",
              artist: "Simon & Garfunkel",
              duration: "4:52",
            },
            { title: "My Generation", artist: "The Who", duration: "3:18" },
            { title: "California Love", artist: "2Pac", duration: "4:16" },
            { title: "Lose Yourself", artist: "Eminem", duration: "5:26" },
            { title: "Crazy", artist: "Gnarls Barkley", duration: "2:59" },
          ].map((song, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 py-2 px-2 rounded hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                <Music className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{song.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {song.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea className="h-80 w-96 rounded-md border">
      <div className="p-4">
        <div className="mb-4 flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <h4 className="text-sm font-medium">React Component</h4>
          <Badge variant="secondary">TypeScript</Badge>
        </div>
        <pre className="text-xs">
          <code>{`import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
          'ring-offset-background transition-colors focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps };`}</code>
        </pre>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Styled Scroll Areas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Rounded Corners</h4>
          <ScrollArea className="h-48 w-full rounded-xl border-2 border-dashed">
            <div className="p-4 space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="py-2 px-3 bg-muted/50 rounded-lg">
                  Item {i + 1} with rounded styling
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Compact Size</h4>
          <ScrollArea className="h-48 w-full rounded-md border">
            <div className="p-2 space-y-1">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="py-1 px-2 text-xs bg-muted/30 rounded">
                  Compact item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  ),
};
