/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "#D1D5DB",  // Light Gray for borders
          input: "#F3F4F6",   // Light background for input fields
          ring: "#60A5FA",    // Teal for focus rings
          background: "#FFFFFF", // White background
          foreground: "#000000", // Default text color
          primary: {
            DEFAULT: "#008080", // Teal color for primary
            foreground: "#FFFFFF", // White for text on primary
          },
          secondary: {
            DEFAULT: "#A7F3D0", // Lighter teal for secondary elements
            foreground: "#FFFFFF", // White text on secondary
          },
          destructive: {
            DEFAULT: "#F87171", // Red for destructive actions (errors, delete buttons)
            foreground: "#FFFFFF", // White text on destructive buttons
          },
          muted: {
            DEFAULT: "#E5E7EB", // Light gray for muted elements
            foreground: "#6B7280", // Darker gray for muted text
          },
          accent: {
            DEFAULT: "#10B981", // A bright teal for accents
            foreground: "#FFFFFF", // White text on accent elements
          },
          popover: {
            DEFAULT: "#FFFFFF", // White popover background
            foreground: "#000000", // Black text in popovers
          },
          card: {
            DEFAULT: "#FFFFFF", // White for card backgrounds
            foreground: "#000000", // Black text inside cards
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  