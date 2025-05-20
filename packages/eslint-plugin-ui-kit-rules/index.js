export default {
    rules: {
        'named-effect-with-cleanup': {
            meta: {
                type: 'suggestion',
                docs: {
                    description: 'Enforce named functions in useEffect with cleanup',
                    category: 'Best Practices',
                    recommended: true,
                },
                messages: {
                    requireNamedFunction: 'useEffect should use a named function instead of an arrow or anonymous function',
                    requireCleanup: 'useEffect should return a cleanup function',
                },
                schema: [], // no options
            },
            create(context) {
                return {
                    // Look for useEffect calls
                    CallExpression(node) {
                        // Check if this is a useEffect call
                        if (
                            node.callee.type === 'Identifier' &&
                            node.callee.name === 'useEffect'
                        ) {
                            const [effectCallback] = node.arguments;

                            // Skip if there are no arguments
                            if (!effectCallback) return;

                            // Check if the callback is an arrow function or anonymous function expression
                            // A named function is either:
                            // - a FunctionExpression with an id
                            // - an Identifier (reference to a previously defined function)

                            // Check for arrow functions or anonymous functions
                            if (
                                (effectCallback.type === 'ArrowFunctionExpression') ||
                                (effectCallback.type === 'FunctionExpression' && !effectCallback.id)
                            ) {
                                context.report({
                                    node: effectCallback,
                                    messageId: 'requireNamedFunction',
                                });
                            }

                            // Check for cleanup function
                            // For direct function expressions (anonymous or named)
                            if (
                                (effectCallback.type === 'FunctionExpression' ||
                                    effectCallback.type === 'ArrowFunctionExpression')
                            ) {
                                const { body } = effectCallback;

                                // For block bodies (with curly braces)
                                if (body.type === 'BlockStatement') {
                                    const hasReturnStatement = body.body.some(statement => {
                                        return statement.type === 'ReturnStatement' && statement.argument !== null;
                                    });

                                    if (!hasReturnStatement) {
                                        context.report({
                                            node: effectCallback,
                                            messageId: 'requireCleanup',
                                        });
                                    }
                                }
                                // For implicit returns in arrow functions
                                else if (body.type !== 'ReturnStatement' && body.type !== 'FunctionExpression') {
                                    context.report({
                                        node: effectCallback,
                                        messageId: 'requireCleanup',
                                    });
                                }
                            }
                        }
                    }
                };
            }
        }
    }
}; 