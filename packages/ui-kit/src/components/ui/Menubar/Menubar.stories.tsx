import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  FileText,
  Copy,
  ClipboardPaste,
  Scissors,
  Save,
  Folder,
  FolderOpen,
  Printer,
  Settings,
  HelpCircle,
  Info,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ZoomIn,
  ZoomOut,
  Search,
  Eye,
  EyeOff,
  Grid,
  List,
} from "lucide-react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./Menubar";

const meta: Meta<typeof Menubar> = {
  title: "UI/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A visually persistent menu common in desktop applications that provides a consistent set of commands.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
    <Menubar className="border">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <FolderOpen className="mr-2 h-4 w-4" />
            Open File
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Folder className="mr-2 h-4 w-4" />
              Recent Files
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>document.txt</MenubarItem>
              <MenubarItem>presentation.pptx</MenubarItem>
              <MenubarItem>spreadsheet.xlsx</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Save className="mr-2 h-4 w-4" />
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As...
            <MenubarShortcut>⌘⇧S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Printer className="mr-2 h-4 w-4" />
            Print
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            <Undo className="mr-2 h-4 w-4" />
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Redo className="mr-2 h-4 w-4" />
            Redo
            <MenubarShortcut>⌘Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <ClipboardPaste className="mr-2 h-4 w-4" />
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Search className="mr-2 h-4 w-4" />
            Find
            <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Replace
            <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>
            <Eye className="mr-2 h-4 w-4" />
            Show Toolbar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>
            <Grid className="mr-2 h-4 w-4" />
            Show Sidebar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="list">
            <MenubarLabel>View Mode</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioItem value="grid">
              <Grid className="mr-2 h-4 w-4" />
              Grid View
            </MenubarRadioItem>
            <MenubarRadioItem value="list">
              <List className="mr-2 h-4 w-4" />
              List View
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Zoom</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <ZoomIn className="mr-2 h-4 w-4" />
                Zoom In
                <MenubarShortcut>⌘+</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <ZoomOut className="mr-2 h-4 w-4" />
                Zoom Out
                <MenubarShortcut>⌘-</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Reset Zoom</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const TextEditor: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <FileText className="mr-2 h-4 w-4" />
              New Document
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <FolderOpen className="mr-2 h-4 w-4" />
              Open
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Save className="mr-2 h-4 w-4" />
              Save
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export As</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>PDF</MenubarItem>
                <MenubarItem>Word Document</MenubarItem>
                <MenubarItem>Plain Text</MenubarItem>
                <MenubarItem>HTML</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <Printer className="mr-2 h-4 w-4" />
              Print
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo className="mr-2 h-4 w-4" />
              Undo
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Redo className="mr-2 h-4 w-4" />
              Redo
              <MenubarShortcut>⌘Y</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Scissors className="mr-2 h-4 w-4" />
              Cut
              <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
              <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ClipboardPaste className="mr-2 h-4 w-4" />
              Paste
              <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Select All</MenubarItem>
            <MenubarItem>
              <Search className="mr-2 h-4 w-4" />
              Find and Replace
              <MenubarShortcut>⌘F</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Text Style</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarCheckboxItem>
                  <Bold className="mr-2 h-4 w-4" />
                  Bold
                  <MenubarShortcut>⌘B</MenubarShortcut>
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>
                  <Italic className="mr-2 h-4 w-4" />
                  Italic
                  <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>
                  <Underline className="mr-2 h-4 w-4" />
                  Underline
                  <MenubarShortcut>⌘U</MenubarShortcut>
                </MenubarCheckboxItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarRadioGroup value="left">
              <MenubarLabel>Text Alignment</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioItem value="left">
                <AlignLeft className="mr-2 h-4 w-4" />
                Align Left
              </MenubarRadioItem>
              <MenubarRadioItem value="center">
                <AlignCenter className="mr-2 h-4 w-4" />
                Align Center
              </MenubarRadioItem>
              <MenubarRadioItem value="right">
                <AlignRight className="mr-2 h-4 w-4" />
                Align Right
              </MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Font Size</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Small</MenubarItem>
                <MenubarItem>Normal</MenubarItem>
                <MenubarItem>Large</MenubarItem>
                <MenubarItem>Extra Large</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Show Ruler</MenubarCheckboxItem>
            <MenubarCheckboxItem>Show Status Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Word Wrap</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              <ZoomIn className="mr-2 h-4 w-4" />
              Zoom In
              <MenubarShortcut>⌘+</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ZoomOut className="mr-2 h-4 w-4" />
              Zoom Out
              <MenubarShortcut>⌘-</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Full Screen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              User Guide
            </MenubarItem>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Info className="mr-2 h-4 w-4" />
              About
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="min-h-[300px] rounded-lg border bg-background p-4">
        <p className="text-sm text-muted-foreground">
          This is a text editor interface with a comprehensive menubar. Click on
          any menu item to see the dropdown options. The menubar includes
          typical application menus like File, Edit, Format, View, and Help
          menus.
        </p>
      </div>
    </div>
  ),
};

const WithCheckboxesComponent = () => {
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showStatusBar, setShowStatusBar] = React.useState(true);

  return (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Interface Elements</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              <Eye className="mr-2 h-4 w-4" />
              Show Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
            >
              <Grid className="mr-2 h-4 w-4" />
              Show Sidebar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              <List className="mr-2 h-4 w-4" />
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide All (Disabled)
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
              <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="rounded-lg border p-4 text-center">
        <p className="text-sm">Current View Settings:</p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>Toolbar: {showToolbar ? "Visible" : "Hidden"}</p>
          <p>Sidebar: {showSidebar ? "Visible" : "Hidden"}</p>
          <p>Status Bar: {showStatusBar ? "Visible" : "Hidden"}</p>
        </div>
      </div>
    </div>
  );
};

export const WithCheckboxes: Story = {
  render: () => <WithCheckboxesComponent />,
};

const WithRadioGroupComponent = () => {
  const [theme, setTheme] = React.useState("light");
  const [layout, setLayout] = React.useState("compact");

  return (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Appearance</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarLabel>Theme</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioItem value="light">Light Theme</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark Theme</MenubarRadioItem>
              <MenubarRadioItem value="auto">System Theme</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarRadioGroup value={layout} onValueChange={setLayout}>
              <MenubarLabel>Layout</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
              <MenubarRadioItem value="comfortable">
                Comfortable
              </MenubarRadioItem>
              <MenubarRadioItem value="spacious">Spacious</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="rounded-lg border p-4 text-center">
        <p className="text-sm">Current Settings:</p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>Theme: {theme}</p>
          <p>Layout: {layout}</p>
        </div>
      </div>
    </div>
  );
};

export const WithRadioGroup: Story = {
  render: () => <WithRadioGroupComponent />,
};

export const Simple: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const MediaPlayer: Story = {
  render: () => (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <FolderOpen className="mr-2 h-4 w-4" />
              Open Media
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Recent Files</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>video1.mp4</MenubarItem>
                <MenubarItem>audio1.mp3</MenubarItem>
                <MenubarItem>presentation.mov</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Add to Playlist</MenubarItem>
            <MenubarItem>Save Playlist</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Playback</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Play/Pause</MenubarItem>
            <MenubarItem>Stop</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Previous</MenubarItem>
            <MenubarItem>Next</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Speed</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value="1x">
                  <MenubarRadioItem value="0.5x">0.5x</MenubarRadioItem>
                  <MenubarRadioItem value="1x">1x (Normal)</MenubarRadioItem>
                  <MenubarRadioItem value="1.25x">1.25x</MenubarRadioItem>
                  <MenubarRadioItem value="1.5x">1.5x</MenubarRadioItem>
                  <MenubarRadioItem value="2x">2x</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Show Playlist</MenubarCheckboxItem>
            <MenubarCheckboxItem>Show Equalizer</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Show Controls</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>Full Screen</MenubarItem>
            <MenubarItem>Mini Player</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/20">
        <p className="text-sm text-muted-foreground">
          Media Player Interface Preview
        </p>
      </div>
    </div>
  ),
};

export const BrowserStyle: Story = {
  render: () => (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarItem>New Private Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Open File</MenubarItem>
            <MenubarItem>Open Location</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Import</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Bookmarks</MenubarItem>
                <MenubarItem>History</MenubarItem>
                <MenubarItem>Passwords</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
            <MenubarItem>Quit Browser</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Find in Page</MenubarItem>
            <MenubarItem>Find Next</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Reload</MenubarItem>
            <MenubarItem>Force Reload</MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>
              Show Bookmarks Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem>Show Downloads</MenubarCheckboxItem>
            <MenubarCheckboxItem>Show Developer Tools</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value="100%">
              <MenubarLabel>Zoom</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioItem value="50%">50%</MenubarRadioItem>
              <MenubarRadioItem value="75%">75%</MenubarRadioItem>
              <MenubarRadioItem value="100%">100%</MenubarRadioItem>
              <MenubarRadioItem value="125%">125%</MenubarRadioItem>
              <MenubarRadioItem value="150%">150%</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Bookmarks</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Bookmark This Page</MenubarItem>
            <MenubarItem>Show All Bookmarks</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Bookmarks Toolbar</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Getting Started</MenubarItem>
                <MenubarItem>Documentation</MenubarItem>
                <MenubarItem>Examples</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Window</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Minimize</MenubarItem>
            <MenubarItem>Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Select Next Tab</MenubarItem>
            <MenubarItem>Select Previous Tab</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>New Tab Group</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>User Guide</MenubarItem>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Report an Issue</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>About Browser</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex h-[300px] items-center justify-center rounded-lg border bg-background">
        <p className="text-center text-sm text-muted-foreground">
          Browser-style application interface
          <br />
          with comprehensive menubar navigation
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
