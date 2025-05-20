// This component intentionally violates accessibility guidelines
// by using a button without proper labels or ARIA attributes
export const A11yTestButton = () => {
    return (
        <button
            onClick={() => alert('Clicked')}
            style={{ backgroundColor: 'blue', color: 'blue' }} // Intentional contrast violation
        >
            Click me
        </button>
    );
}; 