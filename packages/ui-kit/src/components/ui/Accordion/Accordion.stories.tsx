import React from "react";
import type { Meta } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Selection type - single or multiple",
    },
    collapsible: {
      control: { type: "boolean" },
      description: "Whether items can be collapsed when type is single",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the accordion is disabled",
    },
  },
};

export default meta;

export const Default = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleSelection = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a design system?</AccordionTrigger>
        <AccordionContent>
          A design system is a collection of reusable components, guided by
          clear standards, that can be assembled together to build any number of
          applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why use a design system?</AccordionTrigger>
        <AccordionContent>
          Design systems help maintain consistency, improve efficiency, and
          scale design across teams and products. They provide a shared language
          between designers and developers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How to implement a design system?</AccordionTrigger>
        <AccordionContent>
          Start small with basic components, establish design tokens, create
          documentation, and gradually expand. Focus on adoption and maintenance
          from the beginning.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleSelection = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Personal Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Address Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              <strong>Street:</strong> 123 Main Street
            </p>
            <p>
              <strong>City:</strong> San Francisco
            </p>
            <p>
              <strong>State:</strong> CA
            </p>
            <p>
              <strong>ZIP:</strong> 94102
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Preferences</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              <strong>Theme:</strong> Dark Mode
            </p>
            <p>
              <strong>Language:</strong> English
            </p>
            <p>
              <strong>Notifications:</strong> Enabled
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultValue = {
  render: () => (
    <Accordion
      type="single"
      defaultValue="item-2"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Learn the basics of using our platform with this comprehensive guide.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Installation</AccordionTrigger>
        <AccordionContent>
          Follow these step-by-step instructions to install and configure the
          system on your machine.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Advanced Usage</AccordionTrigger>
        <AccordionContent>
          Explore advanced features and customization options for power users.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Section</AccordionTrigger>
        <AccordionContent>
          This section is available and can be expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Section</AccordionTrigger>
        <AccordionContent>
          This content won&apos;t be visible since the section is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Section</AccordionTrigger>
        <AccordionContent>
          This is another section that can be interacted with.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

const ControlledExample = () => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="w-full space-y-4">
      <Accordion
        type="single"
        value={value}
        onValueChange={setValue}
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Controlled Section 1</AccordionTrigger>
          <AccordionContent>
            This accordion is controlled by React state.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Controlled Section 2</AccordionTrigger>
          <AccordionContent>
            You can programmatically control which section is open.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Controlled Section 3</AccordionTrigger>
          <AccordionContent>
            The current open section is managed by state.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2">
        <button
          onClick={() => setValue("item-1")}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          Open Section 1
        </button>
        <button
          onClick={() => setValue("item-2")}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          Open Section 2
        </button>
        <button
          onClick={() => setValue("item-3")}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          Open Section 3
        </button>
        <button
          onClick={() => setValue("")}
          className="rounded bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          Close All
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Current open section: {value || "None"}
      </p>
    </div>
  );
};

export const Controlled = {
  render: () => <ControlledExample />,
};

const ControlledMultipleExample = () => {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div className="w-full space-y-4">
      <Accordion
        type="multiple"
        value={values}
        onValueChange={setValues}
        className="w-full"
      >
        <AccordionItem value="section-1">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            Explore the comprehensive list of features available in our
            platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-2">
          <AccordionTrigger>Pricing</AccordionTrigger>
          <AccordionContent>
            Check out our flexible pricing plans that scale with your needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="section-3">
          <AccordionTrigger>Support</AccordionTrigger>
          <AccordionContent>
            Get help from our support team through multiple channels.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2">
        <button
          onClick={() => setValues(["section-1", "section-2", "section-3"])}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          Open All
        </button>
        <button
          onClick={() => setValues([])}
          className="rounded bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          Close All
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Open sections: {values.length > 0 ? values.join(", ") : "None"}
      </p>
    </div>
  );
};

export const ControlledMultiple = {
  render: () => <ControlledMultipleExample />,
};

export const FAQ = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="faq-1">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent>
          We accept all major credit cards (Visa, MasterCard, American Express),
          PayPal, and bank transfers. For enterprise customers, we also offer
          invoice-based billing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          You can cancel your subscription at any time from your account
          settings. Go to Billing → Subscription → Cancel. Your access will
          continue until the end of your current billing period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
        <AccordionContent>
          Yes! We offer a 14-day free trial for all new users. No credit card
          required. You&apos;ll have access to all features during the trial
          period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
        <AccordionContent>
          Absolutely! We provide 24/7 customer support via email and live chat.
          Premium and Enterprise plans also include priority phone support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-5">
        <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
        <AccordionContent>
          Yes, you can change your plan at any time. Upgrades take effect
          immediately, while downgrades take effect at the next billing cycle.
          Any prorated amounts will be automatically calculated.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NestedContent = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Categories</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Electronics</h4>
              <ul className="mt-2 list-disc pl-4 text-sm">
                <li>Smartphones & Tablets</li>
                <li>Laptops & Computers</li>
                <li>Audio & Headphones</li>
                <li>Gaming Consoles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Home & Garden</h4>
              <ul className="mt-2 list-disc pl-4 text-sm">
                <li>Furniture</li>
                <li>Kitchen Appliances</li>
                <li>Garden Tools</li>
                <li>Home Decor</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="rounded border p-3">
              <h4 className="font-medium text-green-700">Standard Shipping</h4>
              <p className="text-sm text-muted-foreground">
                5-7 business days • Free on orders over $50
              </p>
            </div>
            <div className="rounded border p-3">
              <h4 className="font-medium text-blue-700">Express Shipping</h4>
              <p className="text-sm text-muted-foreground">
                2-3 business days • $9.99
              </p>
            </div>
            <div className="rounded border p-3">
              <h4 className="font-medium text-purple-700">
                Overnight Shipping
              </h4>
              <p className="text-sm text-muted-foreground">
                Next business day • $19.99
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>30-Day Return Window:</strong> Items can be returned
              within 30 days of delivery.
            </p>
            <p>
              <strong>Condition Requirements:</strong> Items must be unused, in
              original packaging, with all tags attached.
            </p>
            <p>
              <strong>Return Process:</strong>
            </p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Initiate return through your account</li>
              <li>Print prepaid return label</li>
              <li>Package item securely</li>
              <li>Drop off at any authorized location</li>
            </ol>
            <p className="text-muted-foreground">
              <em>
                Refunds are processed within 5-7 business days after we receive
                your return.
              </em>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyling = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-l-4 border-l-blue-500">
        <AccordionTrigger className="text-blue-700 hover:text-blue-800">
          Important Information
        </AccordionTrigger>
        <AccordionContent className="bg-blue-50 text-blue-900">
          This is highlighted content with custom styling applied to make it
          stand out from regular content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-l-4 border-l-green-500">
        <AccordionTrigger className="text-green-700 hover:text-green-800">
          Success Story
        </AccordionTrigger>
        <AccordionContent className="bg-green-50 text-green-900">
          This section uses green styling to indicate positive or successful
          information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-l-4 border-l-amber-500">
        <AccordionTrigger className="text-amber-700 hover:text-amber-800">
          Warning Notice
        </AccordionTrigger>
        <AccordionContent className="bg-amber-50 text-amber-900">
          This section uses amber/yellow styling to draw attention to important
          warnings or notices.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
