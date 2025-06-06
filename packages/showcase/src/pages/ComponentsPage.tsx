import React, { useState } from "react";
import { Button, TextInput, useToast } from "@etherisc/ui-kit";

export const ComponentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { success, error, warning, info } = useToast();

  const componentCategories = [
    { id: "all", name: "All Components" },
    { id: "primitives", name: "Primitives" },
    { id: "form", name: "Form Controls" },
    { id: "feedback", name: "Feedback" },
    { id: "layout", name: "Layout" },
  ];

  const components = [
    {
      id: "button",
      name: "Button",
      category: "primitives",
      description: "Interactive button component with multiple variants",
      example: (
        <div className="flex gap-2 flex-wrap">
          <Button>Default Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      ),
    },
    {
      id: "textinput",
      name: "TextInput",
      category: "form",
      description: "Text input field with label and validation support",
      example: (
        <div className="space-y-4 max-w-sm">
          <TextInput label="Name" placeholder="Enter your name" />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <TextInput
            label="With Error"
            error="This field is required"
            placeholder="Invalid input"
          />
        </div>
      ),
    },
    {
      id: "toast",
      name: "Toast",
      category: "feedback",
      description: "Toast notifications for user feedback",
      example: (
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() =>
              success("Success!", "Operation completed successfully")
            }
          >
            Success Toast
          </Button>
          <Button onClick={() => error("Error!", "Something went wrong")}>
            Error Toast
          </Button>
          <Button onClick={() => warning("Warning!", "Please be careful")}>
            Warning Toast
          </Button>
          <Button onClick={() => info("Info", "Here is some information")}>
            Info Toast
          </Button>
        </div>
      ),
    },
  ];

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Component Gallery</h1>
              <p className="text-muted-foreground mt-1">
                Interactive showcase of all UI components
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.history.back()}>← Back</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              label="Search Components"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedCategory(e.target.value)
              }
              className="w-full p-2 border border-border rounded-md bg-background"
            >
              {componentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid gap-8">
          {filteredComponents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No components found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredComponents.map((component) => (
              <div key={component.id} className="bg-card border rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{component.name}</h2>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {
                        componentCategories.find(
                          (cat) => cat.id === component.category,
                        )?.name
                      }
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {component.description}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-background">
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    EXAMPLE
                  </h3>
                  {component.example}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {components.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Components
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {componentCategories.length - 1}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {filteredComponents.length}
              </div>
              <div className="text-sm text-muted-foreground">Showing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
