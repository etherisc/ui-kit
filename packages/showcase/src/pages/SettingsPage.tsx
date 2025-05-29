import React, { useState } from "react";
import { Button, TextInput } from "@etherisc/ui-kit";
import { useAuth } from "../hooks/useAuth";

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    displayName: user?.name || "",
    email: user?.email || "",
    language: "en",
    theme: "light",
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // In a real app, this would make an API call
  };

  const handleReset = () => {
    setSettings({
      displayName: user?.name || "",
      email: user?.email || "",
      language: "en",
      theme: "light",
      emailNotifications: true,
      pushNotifications: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-card border-b z-40 h-16">
        <div className="flex items-center justify-between w-full px-6 h-full">
          <h1 className="text-xl font-semibold">Settings</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Fixed Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-60 bg-card border-r z-30">
          <div className="p-4 space-y-2">
            <h2 className="font-medium text-sm text-muted-foreground mb-3">
              SETTINGS
            </h2>
            <nav className="space-y-1">
              <a
                href="#profile"
                className="block px-3 py-2 text-sm rounded-md bg-primary/10 text-primary"
              >
                Profile
              </a>
              <a
                href="#notifications"
                className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
              >
                Notifications
              </a>
              <a
                href="#privacy"
                className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
              >
                Privacy
              </a>
              <a
                href="#security"
                className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
              >
                Security
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-60 p-6">
          <div className="max-w-2xl space-y-8">
            {/* Profile Section */}
            <section id="profile">
              <h2 className="text-lg font-semibold mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <TextInput
                  label="Display Name *"
                  value={settings.displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSettings((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  placeholder="Enter your display name"
                />
                <TextInput
                  label="Email Address *"
                  type="email"
                  value={settings.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSettings((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter your email"
                />
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium mb-1"
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="theme"
                    className="block text-sm font-medium mb-1"
                  >
                    Theme
                  </label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSettings((prev) => ({
                        ...prev,
                        theme: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section id="notifications">
              <h2 className="text-lg font-semibold mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <div>
                    <label
                      htmlFor="emailNotifications"
                      className="text-sm font-medium"
                    >
                      Email notifications
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSettings((prev) => ({
                        ...prev,
                        pushNotifications: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <div>
                    <label
                      htmlFor="pushNotifications"
                      className="text-sm font-medium"
                    >
                      Push notifications
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section id="security">
              <h2 className="text-lg font-semibold mb-4">Security</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last changed 3 months ago
                  </p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-60 right-0 bg-card border-t z-30 h-14">
        <div className="flex items-center justify-between px-6 h-full">
          <p className="text-sm text-muted-foreground">Last saved: Never</p>
          <p className="text-sm text-muted-foreground">Auto-save: Disabled</p>
        </div>
      </footer>
    </div>
  );
};
