import React from "react"
import { Route, Routes } from "react-router"
import Home from "./pages/home"
import Versions from "./pages/versions"

import "./App.scss"

/** The whole application */
export default function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/versions" element={<Versions />} />
		</Routes>
	)
}