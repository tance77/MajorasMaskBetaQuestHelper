module.exports = {
    theme: {
        extend: {
            borderWidth: {
                '3': '3px',
            },
            colors:{
                'brand': {
                    100: '#FBF8EC',
                    200: '#F4EFCF',
                    300: '#EDE5B2',
                    400: '#E0D179',
                    500: '#D3BD3F',
                    600: '#BEAA39',
                    700: '#7F7126',
                    800: '#5F551C',
                    900: '#3F3913',
                },
            }
        },
    },
    variants: {
        cursor: ['responsive', 'disabled'],
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        borderWidth: ['responsive','even'],
        backgroundColor: ['responsive', 'hover', 'disabled', 'focus', 'odd', 'even'],
    },
    plugins: [
        require('@tailwindcss/ui'),
    ],
};
