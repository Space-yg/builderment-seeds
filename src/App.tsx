import React, { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import Versions from "./pages/versions"
import Disclaimer from "./pages/disclaimer"
import { Footer, Highlight } from "./components/layout"
import { Translate } from "./features/translation"
import { useLanguage } from "./contexts/Language"
import { Loading } from "./components/other"

// Home takes a long time to load. This will help show the loading screen earlier
const Home = lazy(() => import("./pages/home"))

import "./App.scss"

/** The whole application */
export default function App() {
	const language = useLanguage()
	const [versionsText, setVersionsText] = useState<string>("Loading...")

	useEffect(() => {
		// Fetch versions
		fetch(import.meta.env.BASE_URL + "/versions.md")
			.then(res => res.text())
			.then(text => setVersionsText(text))
	}, [])

	// TODO: Add Gtags to all pages
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Translate path={import.meta.env.BASE_URL + "/locales"} lang={language} fallbackLang="en">
					<Highlight />
					<div className="root">
						<Routes>
							<Route index element={<Home />} />
							<Route path="/versions" element={<Versions versionsText={versionsText} />} />
							<Route path="/disclaimer" element={<Disclaimer />} />
						</Routes>
					</div>
					<Footer versionsText={versionsText} />
				</Translate>
			</Suspense>
		</>
	)
}