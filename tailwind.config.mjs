/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				scroll:
				  "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
			  },
			  keyframes: {
				scroll: {
				  to: {
					transform: "translate(calc(-50% - 0.5rem))",
				  },
				},
			}
		},
	},
	plugins: [addVariablesForColors],
}
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }