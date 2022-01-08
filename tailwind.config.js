module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["'DM Serif Display', serif"],
        body: ["'Space Mono', monospace"],
        code: ["'Fira Code', mono"],
      },
      colors: {
        snow: "#f0f1f4",
        powder: "#ededed",
        lead: "#040115",
        orange: "#e59500",
        mint: "#4dcead",
        slate: "#0c0020",
        plum: "#d3bbe5",
        cherry: "#ff6188",
        grape: "#7c5ff5",
      },
      zIndex: {
        "-10": "-10",
        25: 25,
        50: 50,
        75: 75,
        100: 100,
        200: 200,
      },
      animation: {
        "blob-spin": "blobbing 25s linear infinite",
        "blob-spin-reverse": "blobbing-reverse 25s linear infinite",
      },
      keyframes: {
        blobbing: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "blobbing-reverse": {
          from: {
            transform: "rotate(360deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
