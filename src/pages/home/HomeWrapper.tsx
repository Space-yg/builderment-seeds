import React from "react"
import HomeWrapped from "./Home"
import { FilteredSeedsProvider } from "!/context/FilteredSeedsContext"

import "./styles.scss"

/** The whole application */
export default function HomeWrapper() {
	// TODO: Fix the calculate resource with power plant issue
	// TODO: Add loading
	// TODO: Localization
	// TODO: versions and disclaimer pages
	// TODO: Head: Add Google tag, meta data, Open Graph, and Twitter Card
	// TODO Later: Add a way to filter by equal resources. E.g. Instead of Wood = 300, it would be Wood = Coal
	// I could make another option called "Text mode" which will allow the user to write an equation to filter by.
	// This equation can have the resources (wood, coal, etc.) in them and can use advanced operations
	// (+, -, *, /, &, |, ^, &&, ||, != (xor), etc.)
	// TODO Later: Add an option to see the boosted power planets and the used alt resources and a breakdown of all resources
	// https://human-crow.github.io/alt_calculator/?wd=740&st=656&ir=771&cp=645&cl=784&wr=367&ur=64
	// TODO Later: Change the layout of the website as follows:
	// width > 1400px:
	//   header  calculate
	//   main    filter
	//           sort
	// 1150px < width <= 1400px:
	//   header  calculate
	//   filter  sort
	//   main
	// width <= 1150px
	//   header
	//   calculate
	//   filter
	//   sort
	//   main

	// NOW DO: Styling. Stop with tsx and performance, you finished the functionality
	return (
		<>
			{/* Set the filtered seeds */}
			<FilteredSeedsProvider>
				<HomeWrapped />
			</FilteredSeedsProvider>
		</>
	)
}