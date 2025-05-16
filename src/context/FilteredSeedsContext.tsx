import React, { createContext, ReactNode, useContext } from "react"
import { filterSeeds } from "@utils/filters"
import { Seed, Sort, Filter } from "src/types"
import { sortSeeds } from "@utils/sorts"
import { original } from "immer"
import { useImmerReducer } from "use-immer"

/** A filter action */
type FilterAction = {
	type: "filter"
	filters: Filter.FilterGroup
	sorts: Sort.SortOption[]
	/** The **original** seeds */
	seeds: Seed[]
}

/** A sort action */
type SortAction = {
	type: "sort"
	sorts: Sort.SortOption[]
}

/** A set action */
type CalculateAction = {
	type: "calculate"
	/** The **calculated** seeds */
	seeds: Seed[]
	filters: Filter.FilterGroup
	sorts: Sort.SortOption[]
}

/** A set action */
type SetAction = {
	type: "set"
	seeds: Seed[]
}

/** All actions that can be done on filtered seeds */
type Actions = FilterAction | SortAction | CalculateAction | SetAction

/** The filtered seeds context */
const FilteredSeedsContext = createContext<Seed[]>([])
/** The filtered seeds dispatch context */
const FilteredSeedsDispatchContext = createContext<React.ActionDispatch<[Actions]> | null>(null)

/**
 * Execute an action on the filtered seeds
 * @param draft The current filtered seeds
 * @param action The action to make on the filtered seeds
 * @returns The new filtered seeds
 */
function filteredSeedsReducer(draft: Seed[], action: Actions): Seed[] | void {
	/*
	Order of execution:
	1. Calculate
	2. Filter
	3. Sort
	If calculate, then it should calculate, filter, then sort.
	If filter, then it show filter then sort
	If sort, then only sort
	*/

	let seeds: Seed[]
	switch (action.type) {
		case "calculate":
		// Fall through. Calculate will use the calculated seeds, while
		// Filter will use the original seeds
		case "filter":
			// Filter the original seeds, if filter
			seeds = filterSeeds(action.seeds, action.filters, false)
			return sortSeeds(seeds, action.sorts)
		case "sort":
			return sortSeeds(original(draft)!, action.sorts)
		case "set":
			return action.seeds
	}
}

type Props = {
	children: ReactNode
}

/** Provider for filtered seeds setup */
export function FilteredSeedsProvider({ children }: Props) {
	const [filteredSeeds, dispatch] = useImmerReducer<Seed[], Actions>(filteredSeedsReducer, [])

	return (
		<FilteredSeedsDispatchContext.Provider value={dispatch}>
			<FilteredSeedsContext.Provider value={filteredSeeds}>
				{children}
			</FilteredSeedsContext.Provider>
		</FilteredSeedsDispatchContext.Provider>
	)
}

/** Get the filtered seeds */
export function useFilteredSeeds() {
	return useContext(FilteredSeedsContext)
}

/** Execute an event on the filtered seeds */
export function useFilteredSeedsDispatch() {
	return useContext(FilteredSeedsDispatchContext)!
}