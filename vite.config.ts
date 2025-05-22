import { defineConfig, ResolverFunction } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const pagesLocalImport: (path: string, hasIndex?: boolean) => ResolverFunction = (path, hasIndex = false) => (source, importer, options) => {
	// console.log("!!!!!!!!!!!!!!!!! HERE !!!!!!!!!!!!!!!!!")
	// console.log("source:", source)
	// console.log("importer:", /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0])
	// console.log("Importing:", /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0] + path + source + (hasIndex ? "/index.tsx" : ".tsx"))
	return /(\w|\/|:| |-)+\/pages\/\w+/.exec(importer!)![0] + path + source + (hasIndex ? "/index.tsx" : ".tsx")
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			// Global
			{ find: "@/components", replacement: path.resolve(__dirname, "./src/components") },

			// Local
			{ find: "!/features", replacement: "", customResolver: pagesLocalImport("/features", true) },
			{ find: "!/data", replacement: "", customResolver: pagesLocalImport("/data") },
			{ find: "!/utils", replacement: "", customResolver: pagesLocalImport("/utils") },
			{ find: "!/context", replacement: "", customResolver: pagesLocalImport("/context") },
			{ find: "!/type", replacement: "", customResolver: pagesLocalImport("/type") },

			// Can use regex like this (example)
			// { find: /!\/(.*)/, replacement: path.join(path.resolve(__dirname, 'src'), "$1") } // $1 is the first capture group
		],
	},
})
