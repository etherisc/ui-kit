import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { ToastProvider } from '@org/ui-kit';
import { LoginPage } from './pages/LoginPage';

describe('Showcase App', () => {
  it('renders LoginPage without crashing', () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <LoginPage />
        </ToastProvider>
      </BrowserRouter>
    );
    
    // Check that the component renders
    expect(document.body).toBeTruthy();
  });
}); 