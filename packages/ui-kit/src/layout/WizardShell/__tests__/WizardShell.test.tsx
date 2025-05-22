import { render, screen, fireEvent } from '@testing-library/react';
import { WizardShell, WizardStep } from '../WizardShell';
import { vi } from 'vitest';

// Mock the Logo component
vi.mock('../../../components/layout/Logo', () => ({
    Logo: ({ text }: { text: string }) => <div data-testid="logo">{text}</div>,
}));

describe('WizardShell', () => {
    const mockSteps: WizardStep[] = [
        { id: 'step1', label: 'Step 1', isCompleted: true },
        { id: 'step2', label: 'Step 2', isCompleted: false },
        { id: 'step3', label: 'Step 3', isCompleted: false },
    ];

    it('renders title and subtitle correctly', () => {
        render(
            <WizardShell
                title="Test Wizard"
                subtitle="Test Subtitle"
                steps={mockSteps}
                currentStepId="step2"
            >
                Content
            </WizardShell>
        );

        expect(screen.getByText('Test Wizard')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders steps with correct active step highlighted', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
            >
                Content
            </WizardShell>
        );

        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
        expect(screen.getByText('Step 3')).toBeInTheDocument();

        // Step 1 should be completed (shows check icon)
        // Step 2 is active
        expect(screen.getByText('2')).toBeInTheDocument();
        // Step 3 is upcoming
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('calls onExit when exit button is clicked', () => {
        const handleExit = vi.fn();

        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
                onExit={handleExit}
            >
                Content
            </WizardShell>
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(handleExit).toHaveBeenCalledTimes(1);
    });

    it('renders custom exit label when provided', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
                exitLabel="Go Back"
                onExit={() => { }}
            >
                Content
            </WizardShell>
        );

        expect(screen.getByText('Go Back')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
            >
                <div data-testid="wizard-content">Custom Content</div>
            </WizardShell>
        );

        expect(screen.getByTestId('wizard-content')).toBeInTheDocument();
        expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('renders actions when provided', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
                actions={<button data-testid="action-button">Next</button>}
            >
                Content
            </WizardShell>
        );

        expect(screen.getByTestId('action-button')).toBeInTheDocument();
    });

    it('renders custom logo when provided', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
                logo={<div data-testid="custom-logo">Custom Logo</div>}
            >
                Content
            </WizardShell>
        );

        expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
    });

    it('renders default logo when no custom logo is provided', () => {
        render(
            <WizardShell
                title="Test Wizard"
                steps={mockSteps}
                currentStepId="step2"
            >
                Content
            </WizardShell>
        );

        expect(screen.getByTestId('logo')).toBeInTheDocument();
    });
}); 