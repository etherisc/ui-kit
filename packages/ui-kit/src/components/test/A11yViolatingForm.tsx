// This component deliberately violates multiple accessibility guidelines
export const A11yViolatingForm = () => {
    return (
        <div style={{ backgroundColor: '#333', padding: '20px' }}>
            <h1 style={{ color: '#444' }}>Contact Form</h1>

            <div>
                {/* Missing label */}
                <input type="text" placeholder="Name" />
            </div>

            <div>
                {/* Missing label and non-descriptive placeholder */}
                <input type="email" placeholder="..." />
            </div>

            <div>
                {/* Missing alt text on image */}
                <img src="/logo.png" width="100" height="50" />
            </div>

            <div>
                {/* Insufficient color contrast */}
                <button style={{ backgroundColor: '#444', color: '#555' }}>
                    Submit
                </button>
            </div>

            {/* Empty heading */}
            <h2></h2>

            {/* Incorrect heading hierarchy (skipping h3) */}
            <h4>Details</h4>

            {/* Non-semantic button */}
            <div
                onClick={() => alert('Clicked')}
                style={{
                    cursor: 'pointer',
                    padding: '10px',
                    backgroundColor: 'blue'
                }}
            >
                Click me
            </div>
        </div>
    );
}; 