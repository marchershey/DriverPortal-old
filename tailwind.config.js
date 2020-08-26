module.exports = {
    // purge: { enabled: true, content: ["./resources/views/*"] },
    theme: {
        minWidth: {
            screen: "100vw"
        }
    },
    plugins: [require("@tailwindcss/custom-forms")],
    future: {
        removeDeprecatedGapUtilities: true
    }
};
