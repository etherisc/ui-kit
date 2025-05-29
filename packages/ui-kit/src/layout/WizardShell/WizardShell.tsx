import React from 'react';
import { cn } from '../../utils/cn';
import { Logo } from '../../components/layout/Logo';
import { CheckIcon, XIcon } from 'lucide-react';

/**
 * Step interface for wizard steps
 */
export interface WizardStep {
    /**
     * Unique identifier for the step
     */
    id: string;
    /**
     * Label to display for the step
     */
    label: string;
    /**
     * Optional description for the step
     */
    description?: string;
    /**
     * Whether the step is completed
     */
    isCompleted?: boolean;
}

/**
 * WizardShell component props
 */
export interface WizardShellProps {
    /**
     * Title of the wizard
     */
    title: string;
    /**
     * Optional subtitle or description
     */
    subtitle?: string;
    /**
     * Array of steps in the wizard
     */
    steps: WizardStep[];
    /**
     * Current active step ID
     */
    currentStepId: string;
    /**
     * Main content of the wizard
     */
    children: React.ReactNode;
    /**
     * Optional logo element
     */
    logo?: React.ReactNode;
    /**
     * Optional action to execute when cancel/exit is clicked
     */
    onExit?: () => void;
    /**
     * Optional label for the exit button
     */
    exitLabel?: string;
    /**
     * Optional action buttons to display at the bottom
     */
    actions?: React.ReactNode;
    /**
     * Optional additional class name
     */
    className?: string;
}

/**
 * WizardShell - Layout component for multi-step forms and wizards
 * 
 * Features:
 * - Step indicator at the top showing progress
 * - Exit button to cancel the wizard flow
 * - Consistent layout for multi-step forms
 */
export const WizardShell: React.FC<WizardShellProps> = ({
    title,
    subtitle,
    steps,
    currentStepId,
    children,
    logo,
    onExit,
    exitLabel = 'Cancel',
    actions,
    className,
}) => {
    // Find the index of the current step
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

    return (
        <div className={cn(
            "min-h-screen flex flex-col bg-background",
            className
        )}>
            {/* Header with logo and exit button */}
            <header className="border-b border-border p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {logo || <Logo text="Wizard" />}
                </div>

                {onExit && (
                    <button
                        onClick={onExit}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                    >
                        <XIcon size={16} />
                        <span>{exitLabel}</span>
                    </button>
                )}
            </header>

            {/* Title and description */}
            <div className="bg-muted/30 border-b border-border p-6 text-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
            </div>

            {/* Step indicator */}
            <div className="border-b border-border p-4">
                <div className="container max-w-4xl mx-auto">
                    <ol className="flex items-center w-full">
                        {steps.map((step, index) => {
                            const isActive = index === currentStepIndex;
                            const isPast = index < currentStepIndex || step.isCompleted;

                            return (
                                <li
                                    key={step.id}
                                    className={cn(
                                        "flex items-center",
                                        index < steps.length - 1 && "w-full"
                                    )}
                                >
                                    {/* Step circle with number or check */}
                                    <div
                                        className={cn(
                                            "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                                            isPast && "bg-primary text-primary-foreground",
                                            isActive && "bg-primary text-primary-foreground",
                                            !isActive && !isPast && "bg-muted text-muted-foreground"
                                        )}
                                        aria-current={isActive ? "step" : undefined}
                                    >
                                        {isPast ? (
                                            <CheckIcon className="w-4 h-4" />
                                        ) : (
                                            <span>{index + 1}</span>
                                        )}
                                    </div>

                                    {/* Step label */}
                                    <span
                                        className={cn(
                                            "ml-2",
                                            (isActive || isPast) ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {step.label}
                                    </span>

                                    {/* Connector line between steps */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={cn(
                                                "flex-1 h-0.5 mx-4",
                                                index < currentStepIndex ? "bg-primary" : "bg-muted"
                                            )}
                                        ></div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <div className="container max-w-4xl mx-auto p-6 flex-1">
                    {children}
                </div>

                {/* Actions area (buttons) */}
                {actions && (
                    <div className="border-t border-border p-4">
                        <div className="container max-w-4xl mx-auto flex justify-end space-x-4">
                            {actions}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

WizardShell.displayName = 'WizardShell'; 