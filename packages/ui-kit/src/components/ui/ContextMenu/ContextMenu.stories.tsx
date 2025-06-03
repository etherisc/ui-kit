import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Trash2,
  Edit,
  Share2,
  Download,
  Settings,
  Info,
  Star,
  Heart,
  MessageSquare,
  Eye,
  EyeOff,
  FileText,
  Folder,
  Image,
  Video,
} from "lucide-react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a menu to the user — such as a set of actions or functions — triggered by a right click.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[200px] w-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 text-center">
        <Folder className="h-8 w-8 mb-2 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Right click on this file area
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Folder className="mr-2 h-4 w-4" />
            New Folder
            <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPaste className="mr-2 h-4 w-4" />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Rename
            <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </ContextMenuItem>
          <ContextMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Download
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Properties
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

const WithCheckboxItemsComponent = () => {
  const [showHidden, setShowHidden] = React.useState(false);
  const [showExtensions, setShowExtensions] = React.useState(true);
  const [showPreview, setShowPreview] = React.useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border bg-card text-card-foreground">
        <div className="text-center">
          <Eye className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm">View Options Context Menu</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showHidden}
          onCheckedChange={setShowHidden}
        >
          <EyeOff className="mr-2 h-4 w-4" />
          Show Hidden Files
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showExtensions}
          onCheckedChange={setShowExtensions}
        >
          <FileText className="mr-2 h-4 w-4" />
          Show File Extensions
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showPreview}
          onCheckedChange={setShowPreview}
          disabled
        >
          <Eye className="mr-2 h-4 w-4" />
          Show Preview (Disabled)
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const WithCheckboxItems: Story = {
  render: () => <WithCheckboxItemsComponent />,
};

const WithRadioGroupComponent = () => {
  const [sortBy, setSortBy] = React.useState("name");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center">
          <Settings className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm">Sort Options Context Menu</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Sort By</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
          <ContextMenuRadioItem value="date">
            Date Modified
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
          <ContextMenuRadioItem value="type">Type</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const WithRadioGroup: Story = {
  render: () => <WithRadioGroupComponent />,
};

export const WithSubmenus: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[180px] w-[350px] items-center justify-center rounded-lg border bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <Share2 className="h-6 w-6 mx-auto mb-2" />
          <span className="text-sm">Media Context Menu with Submenus</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Email
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </ContextMenuItem>
              <ContextMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Save As
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            Export
          </ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem>
                <Image className="mr-2 h-4 w-4" />
                Export as PNG
              </ContextMenuItem>
              <ContextMenuItem>
                <Image className="mr-2 h-4 w-4" />
                Export as JPEG
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Video className="mr-2 h-4 w-4" />
                  Video Formats
                </ContextMenuSubTrigger>
                <ContextMenuPortal>
                  <ContextMenuSubContent>
                    <ContextMenuItem>MP4</ContextMenuItem>
                    <ContextMenuItem>WebM</ContextMenuItem>
                    <ContextMenuItem>AVI</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuPortal>
              </ContextMenuSub>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Star className="mr-2 h-4 w-4" />
          Add to Favorites
        </ContextMenuItem>
        <ContextMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          Like
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Info className="mr-2 h-4 w-4" />
          Get Info
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[120px] w-[250px] items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 text-sm text-muted-foreground">
        Simple context menu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-red-600">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const TextEditor: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="h-[200px] w-[400px] rounded-md border p-4">
        <div className="h-full w-full bg-muted/10 rounded p-3 text-sm">
          <p className="mb-2 font-medium">Text Editor Context Menu</p>
          <p className="text-muted-foreground leading-relaxed">
            Right click anywhere in this text area to see the context menu with
            text editing options. This simulates a text editor environment with
            common editing actions.
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuItem>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPaste className="mr-2 h-4 w-4" />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Select All</ContextMenuItem>
          <ContextMenuItem>Find</ContextMenuItem>
          <ContextMenuItem>Replace</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Format</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem>Bold</ContextMenuItem>
              <ContextMenuItem>Italic</ContextMenuItem>
              <ContextMenuItem>Underline</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Font Size</ContextMenuItem>
              <ContextMenuItem>Text Color</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <ContextMenu key={i}>
          <ContextMenuTrigger className="flex h-[120px] w-[150px] items-center justify-center rounded-lg border bg-gradient-to-br from-purple-100 to-pink-100">
            <div className="text-center">
              <Image className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <span className="text-xs text-muted-foreground">Image {i}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Full Size
            </ContextMenuItem>
            <ContextMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
