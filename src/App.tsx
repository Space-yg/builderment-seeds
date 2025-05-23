import React from "react"
import { Route, Routes } from "react-router"
import Home from "./pages/home"
import Versions from "./pages/versions"
import Disclaimer from "./pages/disclaimer/Disclaimer"
import { Footer, Highlight } from "./components/layout"

import "./App.scss"

/** The whole application */
export default function App() {
	return (
		<>
			<Highlight />
			<div className="root">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/versions" element={<Versions />} />
					<Route path="/disclaimer" element={<Disclaimer />} />
				</Routes>
			</div>
			<Footer />
		</>
	)
}