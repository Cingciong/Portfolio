// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                'main': ["Source Code Pro", "monospace"],
            },
            colors: {
                primary: '#171616',   // Sand
                secondary: '#343131', // Sunshine
                accent: '#A04747',    // Mint
                neutral: '#D8A25E',   // Seafoam
                based: '#EEDF7A',      // Mist
                text: '#ECDFCC'
            },
        },
    },
    plugins: [
        require('tailwindcss-animated'),
        require('@tailwindcss/line-clamp'),
    ],
}
