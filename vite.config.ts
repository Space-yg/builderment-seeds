import { defineConfig, ResolverFunction } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function inPages(path: string): string | null {
	return /(\w|\/|:| |-)+\/pages\/\w+/.exec(path)?.[0] ?? null
}

const pagesLocalImport: (path: string, hasIndex?: boolean) => ResolverFunction = (path, hasIndex = false) => (source, importer, options) => {
	// console.log("!!!!!!!!!!!!!!!!! HERE !!!!!!!!!!!!!!!!!")
	// console.log("source:", source)
	// console.log("importer:", /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0])
	// console.log("Importing:", /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0] + path + source + (hasIndex ? "/index.tsx" : ".tsx"))
	return /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0] + path + source + (hasIndex ? "/index.tsx" : ".tsx")
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// Wraps all styles in /pages around .{page-name}
		// This is to not mix classes from different pages with each other
		{
			name: "vite-scss-wrapper",
			enforce: "pre",
			transform(code, id, options) {
				if (id.endsWith(".scss")) {
					let pathToPage = inPages(id)

					// SCSS file IS in a page folder
					if (pathToPage) {
						// Skip any @use
						let i = 0
						while (i < code.length) {
							if (code.slice(i, i + 4) === "@use") {
								i = code.indexOf("\n", i) + 1
							} else break
						}

						let atUseCode = code.slice(0, i)
						let restOfCode = code.slice(i)
						return {
							code: `${atUseCode}\n.${pathToPage.split("/").at(-1)} {\n${restOfCode}\n}`,
						}
					}
				}
			},
		}
	],
	resolve: {
		alias: [
			// Global
			{ find: "@/components", replacement: path.resolve(__dirname, "./src/components") },
			{ find: "@/features", replacement: path.resolve(__dirname, "./src/features") },
			{ find: "@/contexts", replacement: path.resolve(__dirname, "./src/contexts") },

			// Local
			{ find: "!/features", replacement: "", customResolver: pagesLocalImport("/features", true) },
			{ find: "!/data", replacement: "", customResolver: pagesLocalImport("/data") },
			{ find: "!/utils", replacement: "", customResolver: pagesLocalImport("/utils") },
			{ find: "!/contexts", replacement: "", customResolver: pagesLocalImport("/contexts") },
			{ find: "!/type", replacement: "", customResolver: pagesLocalImport("/type") },

			// Can use regex like this (example)
			// { find: /!\/(.*)/, replacement: path.join(path.resolve(__dirname, 'src'), "$1") } // $1 is the first capture group
		],
	},
	base: "/builderment-seeds",
})