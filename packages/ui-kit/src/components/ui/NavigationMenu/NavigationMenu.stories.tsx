import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Home,
  User,
  Settings,
  ShoppingCart,
  BookOpen,
  Users,
  FileText,
  Calendar,
  Star,
  Heart,
  Download,
  Globe,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collection of links for navigating websites. Built using Radix UI Navigation Menu primitive.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Home className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Welcome</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautiful and accessible navigation components built for
                      modern web.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs"
                  >
                    <div className="flex items-center text-sm font-medium leading-none">
                      <FileText className="mr-2 h-4 w-4" />
                      Documentation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn how to use our components in your projects.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/installation"
                  >
                    <div className="flex items-center text-sm font-medium leading-none">
                      <Download className="mr-2 h-4 w-4" />
                      Installation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs/components/button"
                  >
                    <div className="text-sm font-medium leading-none">
                      Button
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Displays a button or a component that looks like a button.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs/components/card"
                  >
                    <div className="text-sm font-medium leading-none">Card</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Displays a card with header, content, and footer.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs/components/dialog"
                  >
                    <div className="text-sm font-medium leading-none">
                      Dialog
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A window overlaid on either the primary window.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs/components/form"
                  >
                    <div className="text-sm font-medium leading-none">Form</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Building forms with validation and error handling.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/about"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/products"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/about"
          >
            <User className="mr-2 h-4 w-4" />
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/contact"
          >
            <Globe className="mr-2 h-4 w-4" />
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple navigation menu with direct links and icons.",
      },
    },
  },
};

export const WithDropdowns: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/shop/clothing"
                  >
                    <div className="text-sm font-medium leading-none">
                      Clothing
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      T-shirts, hoodies, and more fashion items.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/shop/accessories"
                  >
                    <div className="text-sm font-medium leading-none">
                      Accessories
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Bags, watches, and jewelry collection.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/shop/electronics"
                  >
                    <div className="text-sm font-medium leading-none">
                      Electronics
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest gadgets and tech accessories.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/shop/sale"
                  >
                    <div className="flex items-center text-sm font-medium leading-none">
                      <Star className="mr-1 h-3 w-3" />
                      Sale Items
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Special offers and discounted products.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BookOpen className="mr-2 h-4 w-4" />
            Learn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-1">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/tutorials"
                  >
                    <div className="text-sm font-medium leading-none">
                      Tutorials
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Step-by-step guides to get you started.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/blog"
                  >
                    <div className="text-sm font-medium leading-none">Blog</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest articles and industry insights.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/webinars"
                  >
                    <div className="flex items-center text-sm font-medium leading-none">
                      <Calendar className="mr-1 h-3 w-3" />
                      Webinars
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Join our live online sessions and workshops.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/support"
          >
            <Settings className="mr-2 h-4 w-4" />
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation menu with dropdown menus containing grouped links.",
      },
    },
  },
};

export const Minimal: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/about"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/contact"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal navigation menu with just text links.",
      },
    },
  },
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ReactNode;
  }
>(({ title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const WithCustomListItems: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Heart className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Our Services
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive solutions for your business needs.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/services/consulting"
                title="Consulting"
                icon={<Users className="h-4 w-4" />}
              >
                Expert advice and strategic planning for your projects.
              </ListItem>
              <ListItem
                href="/services/development"
                title="Development"
                icon={<Settings className="h-4 w-4" />}
              >
                Custom software development and technical solutions.
              </ListItem>
              <ListItem
                href="/services/support"
                title="Support"
                icon={<Heart className="h-4 w-4" />}
              >
                24/7 technical support and maintenance services.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/portfolio"
          >
            Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/contact"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navigation menu with custom list item components for better reusability.",
      },
    },
  },
};
