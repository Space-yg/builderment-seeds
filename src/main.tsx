import React from "react"
import App from "./App.tsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { LanguageProvider } from "./contexts/Language.tsx"

import "./index.scss"

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter basename="/builderment-seeds">
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</BrowserRouter>
	</React.StrictMode>
)
