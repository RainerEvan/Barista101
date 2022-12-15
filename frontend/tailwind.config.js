module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: "'Poppins', sans-serif",
            },
            fontSize: {},
            fontWeight: {
                light: 300,
                regular: 400,
                medium: 500,
                semibold: 600,
                bold: 700
            },
        },
    },
}