# Internationalization (i18n)

This UI kit includes built-in internationalization support using `react-i18next`. Currently supported locales are English (`en`) and German (`de`).

## Quick Start

### 1. Wrap your app with I18nProvider

```tsx
import { I18nProvider } from "@org/ui-kit";

function App() {
  return <I18nProvider>{/* Your app components */}</I18nProvider>;
}
```

### 2. Use translations in components

```tsx
import { useTranslation } from "@org/ui-kit";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("navigation.dashboard")}</h1>
      <button>{t("button.save")}</button>
    </div>
  );
}
```

## Available Translation Keys

### Buttons

- `button.submit` - Submit / Absenden
- `button.cancel` - Cancel / Abbrechen
- `button.save` - Save / Speichern
- `button.delete` - Delete / Löschen
- `button.edit` - Edit / Bearbeiten
- `button.close` - Close / Schließen
- `button.back` - Back / Zurück
- `button.next` - Next / Weiter
- `button.previous` - Previous / Vorherige
- `button.loading` - Loading... / Lädt...
- `button.login` - Login / Anmelden
- `button.logout` - Logout / Abmelden

### Forms

- `form.required` - This field is required / Dieses Feld ist erforderlich
- `form.email` - Email / E-Mail
- `form.password` - Password / Passwort
- `form.confirmPassword` - Confirm Password / Passwort bestätigen
- `form.firstName` - First Name / Vorname
- `form.lastName` - Last Name / Nachname
- `form.search` - Search / Suchen
- `form.filter` - Filter / Filter
- `form.clear` - Clear / Löschen

### Navigation

- `navigation.home` - Home / Startseite
- `navigation.dashboard` - Dashboard / Dashboard
- `navigation.customers` - Customers / Kunden
- `navigation.settings` - Settings / Einstellungen
- `navigation.profile` - Profile / Profil
- `navigation.help` - Help / Hilfe

### Tables

- `table.noData` - No data available / Keine Daten verfügbar
- `table.loading` - Loading data... / Daten werden geladen...
- `table.rowsPerPage` - Rows per page / Zeilen pro Seite
- `table.of` - of / von
- `table.page` - Page / Seite
- `table.actions` - Actions / Aktionen

### Toasts

- `toast.success` - Success / Erfolg
- `toast.error` - Error / Fehler
- `toast.warning` - Warning / Warnung
- `toast.info` - Information / Information

### Validation

- `validation.required` - This field is required / Dieses Feld ist erforderlich
- `validation.email` - Please enter a valid email address / Bitte geben Sie eine gültige E-Mail-Adresse ein
- `validation.minLength` - Must be at least {{count}} characters / Muss mindestens {{count}} Zeichen lang sein
- `validation.maxLength` - Must be no more than {{count}} characters / Darf höchstens {{count}} Zeichen lang sein
- `validation.passwordMismatch` - Passwords do not match / Passwörter stimmen nicht überein

## Language Switching

### Programmatically

```tsx
import { useTranslation } from "@org/ui-kit";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const switchToGerman = () => {
    i18n.changeLanguage("de");
  };

  const switchToEnglish = () => {
    i18n.changeLanguage("en");
  };

  return (
    <div>
      <button onClick={switchToEnglish}>English</button>
      <button onClick={switchToGerman}>Deutsch</button>
    </div>
  );
}
```

### In Storybook

Use the locale switcher in the Storybook toolbar (globe icon) to test components in different languages.

## Adding New Translations

### 1. Add to English translations

Edit `src/i18n/locales/en.json`:

```json
{
  "myFeature": {
    "title": "My Feature Title",
    "description": "Feature description"
  }
}
```

### 2. Add German translations

Edit `src/i18n/locales/de.json`:

```json
{
  "myFeature": {
    "title": "Mein Feature Titel",
    "description": "Feature Beschreibung"
  }
}
```

### 3. Use in components

```tsx
const { t } = useTranslation();
return <h1>{t("myFeature.title")}</h1>;
```

## Interpolation

For dynamic values, use interpolation:

```tsx
// Translation key: "welcome": "Welcome, {{name}}!"
const { t } = useTranslation();
return <p>{t("welcome", { name: "John" })}</p>;
```

## Language Detection

The i18n system automatically detects the user's language preference from:

1. localStorage (if previously set)
2. Browser language
3. HTML lang attribute
4. Falls back to English

## TypeScript Support

The i18n system is fully typed. Translation keys are type-checked to ensure they exist in the translation files.
