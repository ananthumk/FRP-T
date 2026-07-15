export default {
    plugins: {
        'postcss-prefix-selector': {
            prefix: '#root',
            transform(prefix, selector, prefixedSelector) {
                const trimmed = selector.trim()
                if (!trimmed.startsWith('.')) {
                    return selector
                }
                return prefixedSelector
            },
        },
    },
}