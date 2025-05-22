import React from 'react';

/**
 * WizardShell component props
 */
export interface WizardShellProps {
    /**
     * Current step number (1-based)
     */
    currentStep: number;
    /**
     * Total number of steps
     */
    totalSteps: number;
    /**
     * Main content to display
     */
    children: React.ReactNode;
    /**
     * Optional title for the current step
     */
    stepTitle?: string;
    /**
     * Optional callback for when the exit link is clicked
     */
    onExit?: () => void;
    /**
     * Optional text for the exit link
     */
    exitText?: string;
    /**
     * Optional additional header content
     */
    header?: React.ReactNode;
    /**
     * Optional additional footer content
     */
    footer?: React.ReactNode;
}

/**
 * WizardShell - Multi-step wizard layout with progress indicator
 */
export const WizardShell: React.FC<WizardShellProps> = ({
    currentStep,
    totalSteps,
    children,
    stepTitle,
    onExit,
    exitText = 'Exit',
    header,
    footer,
}) => {
    return (
        <div className="wizard-shell">
            {/* Header with step indicator */}
            <header className="wizard-header">
                {/* Exit link */}
                {onExit && (
                    <button
                        className="wizard-exit"
                        onClick={onExit}
                        aria-label={exitText}
                    >
                        {exitText}
                    </button>
                )}

                {/* Step progress */}
                <div className="wizard-progress">
                    <div className="wizard-step-indicator">
                        {`Step ${currentStep} of ${totalSteps}`}
                    </div>
                    {/* Progress bar to be implemented */}
                </div>

                {/* Step title */}
                {stepTitle && <h1 className="wizard-step-title">{stepTitle}</h1>}

                {/* Additional header content */}
                {header && <div className="wizard-header-content">{header}</div>}
            </header>

            {/* Main content */}
            <main className="wizard-content">{children}</main>

            {/* Footer */}
            {footer && <footer className="wizard-footer">{footer}</footer>}
        </div>
    );
};

WizardShell.displayName = 'WizardShell'; 