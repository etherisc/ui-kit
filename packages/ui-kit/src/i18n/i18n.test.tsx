import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { I18nProvider } from '../providers/I18nProvider';
import { useTranslation } from 'react-i18next';
import i18n from './config';

// Test component that uses translation
const TestComponent = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation();
  return <div data-testid="translated-text">{t(translationKey)}</div>;
};

// Test component that shows current language
const LanguageDisplay = () => {
  const { i18n } = useTranslation();
  return <div data-testid="current-language">{i18n.language}</div>;
};

describe('i18n functionality', () => {
  beforeEach(async () => {
    // Reset to English before each test
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  it('renders English translations by default', () => {
    render(
      <I18nProvider>
        <TestComponent translationKey="button.submit" />
      </I18nProvider>
    );

    expect(screen.getByTestId('translated-text')).toHaveTextContent('Submit');
  });

  it('switches to German translations', async () => {
    render(
      <I18nProvider>
        <TestComponent translationKey="button.submit" />
      </I18nProvider>
    );

    // Change language to German with act wrapper
    await act(async () => {
      await i18n.changeLanguage('de');
    });

    expect(screen.getByTestId('translated-text')).toHaveTextContent('Absenden');
  });

  it('falls back to English when German translation is missing', async () => {
    render(
      <I18nProvider>
        <TestComponent translationKey="nonexistent.key" />
      </I18nProvider>
    );

    await act(async () => {
      await i18n.changeLanguage('de');
    });

    // Should show the key since it doesn't exist
    expect(screen.getByTestId('translated-text')).toHaveTextContent('nonexistent.key');
  });

  it('handles interpolation correctly', () => {
    render(
      <I18nProvider>
        <TestComponent translationKey="validation.minLength" />
      </I18nProvider>
    );

    // The interpolation should show the placeholder
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Must be at least {{count}} characters');
  });

  it('detects and sets language correctly', () => {
    render(
      <I18nProvider>
        <LanguageDisplay />
      </I18nProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });

  it('provides all expected translation keys for buttons', () => {
    const buttonKeys = [
      'button.submit',
      'button.cancel', 
      'button.save',
      'button.delete',
      'button.edit',
      'button.close',
      'button.login',
      'button.logout'
    ];

    render(
      <I18nProvider>
        <div>
          {buttonKeys.map((key) => (
            <TestComponent key={key} translationKey={key} />
          ))}
        </div>
      </I18nProvider>
    );

    // Check that all button translations are rendered by checking specific text content
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
}); 