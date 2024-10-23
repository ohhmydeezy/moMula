/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customYellow: 'rbg(255, 245, 0)'
      },
      backgroundImage: {
        'custom-background': "url('assets/images/abstract-flow-neon-blue-digital-art-5k.jpg')",
      },
    },
  },
  plugins: [],
}

