import React, { createContext, ReactNode, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { Filter } from "@/types"
import { getFilter, getGroup } from "@/features/filter/utils/helpers"
import { swap } from "@/utils/helpers"

/** Set the filters */
type SetAction = {
	type: "set"
	filter: Filter.FilterGroup
}

/** Add a filter to the filters */
type AddAction = {
	type: "add"
	/** The filter to add */
	filter: Filter.FilterName
	groupIds: number[]
	currentId: number
}

/** Delete a filter */
type DeleteAction = {
	type: "delete"
	groupIds: number[]
	id: number
}

/** Move a filter */
type MoveAction = {
	type: "move"
	groupIds: number[]
	id: number
	direction: "up" | "down"
}

/** Update a filter */
type UpdateAction = {
	type: "update"
	/** The filter to update. If not specified, then updates the filter group */
	filterId?: number
	updater(draft: Filter.Filter): void
	groupIds: number[]
}

/** All actions that can be done on filters */
type Actions = SetAction | AddAction | DeleteAction | MoveAction | UpdateAction

/** The filters context */
const FiltersContext = createContext<Filter.FilterGroup>({
	filter: "group",
	group: [],
	id: 0,
	operation: "and"
})
/** The filters dispatch context */
const FiltersDispatchContext = createContext<React.ActionDispatch<[Actions]> | null>(null)

/**
 * Execute an action on the filters
 * @param draft The current filters
 * @param action The action to make on the filters
 * @returns The new filters
 */
function filtersReducer(draft: Filter.FilterGroup, action: Actions): void {
	let group
	switch (action.type) {
		// Set the filter
		case "set":
			Object.assign(draft, action.filter)
			return

		// Add a filter
		case "add":
			// Get the right group
			group = getGroup(draft, action.groupIds)!.group

			// Add the filter
			switch (action.filter) {
				case "resource":
					group.push({
						id: action.currentId + 1,
						filter: action.filter,
						resource: "Wood Log",
						sign: "=",
						amount: 0,
					})
					break

				case "world size":
					group.push({
						id: action.currentId + 1,
						filter: action.filter,
						sign: "=",
						size: 100,
					})
					break

				case "resource amount":
					group.push({
						id: action.currentId + 1,
						filter: action.filter,
						sign: "=",
						amount: 100,
					})
					break

				case "seed":
					group.push({
						id: action.currentId + 1,
						filter: action.filter,
						operation: "is",
						seed: ""
					})
					break

				case "group":
					group.push({
						id: action.currentId + 1,
						filter: action.filter,
						group: [],
						operation: "and"
					})
					break
			}
			return
		case "delete":
			group = getGroup(draft, action.groupIds)!.group
			group.splice(group.findIndex(filter => filter.id === action.id), 1)
			return
		case "move":
			// FIX: Make it focus-visible the button again
			// The problem here is that the keys of this FilterOption
			// and their siblings are related but the ones in a
			// FilterGroup is not related to this and the others,
			// which makes the website rerender the component as a new
			// component rather than rearrangement of components.
			// One solution can be to refactor FilterGroup to NOT
			// use a recursive way of making the filters and use an
			// iterative approach.
			const previousFilterGroup = action.groupIds.length === 1 ? null : getGroup(draft, action.groupIds.slice(0, -1))!
			const filterGroup = getGroup(draft, action.groupIds)!

			// Get the index of this filter
			const filterIndex = filterGroup.group.findIndex(filter => filter.id === action.id)

			// Move down
			if (action.direction === "down") {
				// If NOT the last element in the group
				if (filterIndex !== filterGroup.group.length - 1) {
					// If the next filter is NOT a filter group, then swap
					if (filterGroup.group[filterIndex + 1].filter !== "group") swap(filterGroup.group, filterIndex, filterIndex + 1)

					// If the next filter is a filter group, then put this filter inside the filter group
					else (filterGroup.group[filterIndex + 1] as Filter.FilterGroup).group.unshift(filterGroup.group.splice(filterIndex, 1)[0])
				}

				// If the last element in the group
				else {
					// If there is a group before it
					if (previousFilterGroup !== null) {
						// Get the index of filterGroup in previousFilterGroup.group,
						// pop the last element of filterGroup.group,
						// add it to the previousFilterGroup after the filterGroup group
						previousFilterGroup.group.splice(previousFilterGroup.group.findIndex(filter => filter.id === filterGroup.id) + 1, 0, filterGroup.group.pop()!)
					}
					// If there is no group, do nothing
				}
			}
			// Move up
			else {
				// If NOT the first element in the group
				if (filterIndex !== 0) {
					// If the previous filter is NOT a filter group, then swap
					if (filterGroup.group[filterIndex - 1].filter !== "group") swap(filterGroup.group, filterIndex, filterIndex - 1)

					// If the previous filter is a filter group, then put this filter inside the filter group
					else (filterGroup.group[filterIndex - 1] as Filter.FilterGroup).group.push(filterGroup.group.splice(filterIndex, 1)[0])
				}

				// If the first element in the group
				else {
					// If there is a group before it
					if (previousFilterGroup !== null) {
						// Get the index of filterGroup in previousFilterGroup.group,
						// pop the last element of filterGroup.group,
						// add it to the previousFilterGroup after the filterGroup group
						previousFilterGroup.group.splice(previousFilterGroup.group.findIndex(filter => filter.id === filterGroup.id), 0, filterGroup.group.shift()!)
					}
					// If there is no group, do nothing
				}
			}
			return
		case "update":
			action.updater(typeof action.filterId === "undefined" ? getGroup(draft, action.groupIds)! : getFilter(draft, action.groupIds, action.filterId)!)
			return
	}
}

type Props = {
	children: ReactNode
}

/** Provider for filters setup */
export function FiltersProvider({ children }: Props) {
	const [filters, dispatch] = useImmerReducer<Filter.FilterGroup, Actions>(filtersReducer, {
		filter: "group",
		group: [],
		id: 0,
		operation: "and"
	})

	return (
		<FiltersDispatchContext.Provider value={dispatch}>
			<FiltersContext.Provider value={filters}>
				{children}
			</FiltersContext.Provider>
		</FiltersDispatchContext.Provider>
	)
}

/** Get the filters */
export function useFilters() {
	return useContext(FiltersContext)
}

/** Execute an event on the filters */
export function useFiltersDispatch() {
	return useContext(FiltersDispatchContext)!
}