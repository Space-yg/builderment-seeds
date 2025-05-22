import React from "react"
import App from "./App.tsx"
import { createRoot } from "react-dom/client"
import { FilteredSeedsProvider } from "@/context/FilteredSeedsContext.tsx"

import "./index.scss"

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>

		{/* Set the filtered seeds */}
		<FilteredSeedsProvider>

			{/* The actual application */}
			<App />

		</FilteredSeedsProvider>

	</React.StrictMode>
)
