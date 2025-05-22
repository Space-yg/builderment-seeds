import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@/components": path.resolve(__dirname, "./src/components"),
			"@/features": path.resolve(__dirname, "./src/features"),
			"@/data": path.resolve(__dirname, "./src/data"),
			"@/utils": path.resolve(__dirname, "./src/utils"),
			"@/context": path.resolve(__dirname, "./src/context"),
			"@/type": path.resolve(__dirname, "./src/type"),
		},
	}
})
