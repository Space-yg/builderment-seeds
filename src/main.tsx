import React from "react"
import App from "./App.tsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import "./index.scss"

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter basename="/builderment-seeds">
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
