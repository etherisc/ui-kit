import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  MapPin,
  Calendar,
  Mail,
  ExternalLink,
  Star,
  GitBranch,
  Users,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Building,
  Package,
  Trophy,
  Zap,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "./HoverCard";
import { Button } from "../button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A hover card component that displays additional content when hovering over a trigger element. Built on Radix UI primitives with smooth animations.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center justify-center space-x-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="p-0">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <span>John Doe</span>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-medium">
              JD
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">John Doe</h4>
              <p className="text-sm">Senior Frontend Developer at TechCorp</p>
              <div className="flex items-center pt-2 space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  San Francisco, CA
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Mail className="mr-1 h-3 w-3" />
                john@techcorp.com
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Joined March 2020
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="p-0">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-sm font-medium">
                AS
              </div>
              <span>Alice Smith</span>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-medium">
              AS
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Alice Smith</h4>
              <p className="text-sm">Product Manager at InnovateCo</p>
              <div className="flex items-center pt-2 space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  New York, NY
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Mail className="mr-1 h-3 w-3" />
                alice@innovateco.com
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Joined January 2022
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const GitHubRepository: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <GitBranch className="mr-2 h-4 w-4" />
          react/react
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold">react/react</h4>
              <p className="text-sm text-muted-foreground">
                The library for web and native user interfaces
              </p>
            </div>
            <Badge variant="secondary">Public</Badge>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-yellow-400"></div>
              JavaScript
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3" />
              220k
            </div>
            <div className="flex items-center">
              <GitBranch className="mr-1 h-3 w-3" />
              43k
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Updated 2 hours ago
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div className="flex items-center justify-center space-x-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer rounded-lg border p-4 hover:bg-muted/50">
            <Package className="h-8 w-8 text-blue-500" />
            <h3 className="mt-2 font-medium">Premium Plan</h3>
            <p className="text-sm text-muted-foreground">Starting at $29/mo</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500" />
              <h4 className="text-sm font-semibold">Premium Plan</h4>
              <Badge variant="default">Popular</Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Perfect for growing teams and businesses that need advanced
              features.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-2xl font-bold">$29</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>

              <ul className="space-y-1 text-sm">
                <li>✓ Up to 50 team members</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Custom integrations</li>
              </ul>
            </div>

            <Button className="w-full" size="sm">
              Get Started
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer rounded-lg border p-4 hover:bg-muted/50">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h3 className="mt-2 font-medium">Enterprise</h3>
            <p className="text-sm text-muted-foreground">Custom pricing</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h4 className="text-sm font-semibold">Enterprise Plan</h4>
              <Badge variant="secondary">Custom</Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Tailored solutions for large organizations with enterprise-grade
              security.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-lg font-semibold">Custom pricing</span>
              </div>

              <ul className="space-y-1 text-sm">
                <li>✓ Unlimited team members</li>
                <li>✓ Advanced security & compliance</li>
                <li>✓ Dedicated support team</li>
                <li>✓ Custom development</li>
                <li>✓ SLA guarantees</li>
              </ul>
            </div>

            <Button variant="outline" className="w-full" size="sm">
              Contact Sales
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const SocialPost: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer rounded-lg border p-4 max-w-md hover:bg-muted/50">
          <div className="flex items-start space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
              SM
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">@sarah_dev</span> just shipped a
                new feature that improves performance by 40%! 🚀
              </p>
              <div className="flex items-center mt-2 space-x-4 text-xs text-muted-foreground">
                <button className="flex items-center space-x-1 hover:text-red-500">
                  <Heart className="h-3 w-3" />
                  <span>24</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <MessageCircle className="h-3 w-3" />
                  <span>5</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500">
                  <Share2 className="h-3 w-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-medium">
            SM
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Sarah Miller</h4>
            <p className="text-sm">@sarah_dev</p>
            <p className="text-sm text-muted-foreground">
              Senior Software Engineer at TechFlow. Passionate about performance
              optimization and developer experience.
            </p>
            <div className="flex items-center pt-2">
              <div className="flex items-center text-xs text-muted-foreground mr-4">
                <Users className="mr-1 h-3 w-3" />
                2.3k followers
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Joined May 2021
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <Building className="mr-2 h-4 w-4" />
          TechCorp Inc.
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <HoverCardArrow />
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <h4 className="text-sm font-semibold">TechCorp Inc.</h4>
            <Badge variant="outline">Verified</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Leading technology company specializing in innovative software
            solutions for enterprise clients worldwide.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Founded</div>
              <div className="font-medium">2015</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Employees</div>
              <div className="font-medium">1,200+</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">San Francisco, CA</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Industry</div>
              <div className="font-medium">Software</div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="mr-2 h-3 w-3" />
            Visit Website
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 items-center justify-items-center min-h-[400px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Top Position</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Right</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Right Position</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears to the right of the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Left</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left" className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Left Position</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears to the left of the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Bottom Position</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears below the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const CustomTiming: Story = {
  render: () => (
    <div className="flex space-x-4">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Fast (100ms)
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Fast Response</h4>
            <p className="text-sm text-muted-foreground">
              Opens and closes quickly with 100ms delay.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={700} closeDelay={300}>
        <HoverCardTrigger asChild>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Slow (700ms)
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Delayed Response</h4>
            <p className="text-sm text-muted-foreground">
              Takes 700ms to open but only 300ms to close.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
