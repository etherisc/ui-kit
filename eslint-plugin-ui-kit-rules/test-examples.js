// Bad examples - should trigger errors

import { useEffect } from 'react';

// Bad: Arrow function without cleanup
const BadArrowNoCleanup = () => {
    useEffect(() => {
        console.log('Effect running');
        // Missing cleanup function
    }, []);
};

// Bad: Anonymous function without cleanup
const BadAnonymousNoCleanup = () => {
    useEffect(function () {
        console.log('Effect running');
        // Missing cleanup function
    }, []);
};

// Bad: Arrow function with cleanup
const BadArrowWithCleanup = () => {
    useEffect(() => {
        console.log('Effect running');
        return () => {
            console.log('Cleanup running');
        };
    }, []);
};

// Bad: Anonymous function with cleanup
const BadAnonymousWithCleanup = () => {
    useEffect(function () {
        console.log('Effect running');
        return () => {
            console.log('Cleanup running');
        };
    }, []);
};

// Good examples - should pass

// Good: Named function with cleanup
const GoodNamedWithCleanup = () => {
    useEffect(function setupEffect() {
        console.log('Effect running');
        return function cleanupEffect() {
            console.log('Cleanup running');
        };
    }, []);
};

// Good: External named function with cleanup
const GoodExternalNamedFunction = () => {
    function setupEffect() {
        console.log('Effect running');
        return function cleanupEffect() {
            console.log('Cleanup running');
        };
    }

    useEffect(setupEffect, []);
}; 