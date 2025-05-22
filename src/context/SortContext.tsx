import { swap } from "@/utils/helpers"
import React, { createContext, ReactNode, useContext } from "react"
import { Sort } from "@/types"
import { useImmerReducer } from "use-immer"

/** Set the sorts */
type SetAction = {
	type: "set"
	sorts: Sort.SortOption[]
}

type AddAction = {
	type: "add"
	sort: Sort.SortOption
	currentId: number
}

/** Delete a sort */
type DeleteAction = {
	type: "delete"
	/** The sort to delete */
	id: number
}

/** Move a sort */
type MoveAction = {
	type: "move"
	/** The direction to move the sort by */
	direction: "up" | "down"
	/** The sort to move */
	id: number
}

/** Update a filter */
type UpdateAction = {
	type: "update"
	/** The sort to update */
	id: number
	updater(draft: Sort.SortOption): void
}

/** All actions that can be done on sorts */
type Actions = SetAction | AddAction | DeleteAction | MoveAction | UpdateAction

/** The sorts context */
const SortsContext = createContext<Sort.SortOption[]>([])
/** The sorts dispatch context */
const SortsDispatchContext = createContext<React.ActionDispatch<[Actions]> | null>(null)

/**
 * Execute an action on the sorts
 * @param draft The current sorts
 * @param action The action to make on the sorts
 * @returns The new sorts
 */
function sortsReducer(draft: Sort.SortOption[], action: Actions): void {
	switch (action.type) {
		case "set":
			draft.splice(0, draft.length, ...action.sorts)
			return
		case "add":
			draft.push({
				id: action.currentId,
				resource: "w",
				order: "ascending",
			})
			return
		case "delete":
			draft.splice(draft.findIndex(sort => sort.id === action.id), 1)
			return
		case "move":
			// Get the index of this sort
			const sortIndex = draft.findIndex(filter => filter.id === action.id)

			// Move down
			if (action.direction === "down" && sortIndex !== draft.length - 1) {
				swap(draft, sortIndex, sortIndex + 1)
			}
			// Move up
			else if (action.direction === "up" && sortIndex !== 0) {
				swap(draft, sortIndex, sortIndex - 1)
			}
			return
		case "update":
			action.updater(draft.find(sort => sort.id === action.id)!)
			return
	}
}

type Props = {
	children: ReactNode
}

/** Provider for sorts setup */
export function SortsProvider({ children }: Props) {
	const [sorts, dispatch] = useImmerReducer<Sort.SortOption[], Actions>(sortsReducer, [])

	return (
		<SortsDispatchContext.Provider value={dispatch}>
			<SortsContext.Provider value={sorts}>
				{children}
			</SortsContext.Provider>
		</SortsDispatchContext.Provider>
	)
}

/** Get the sorts */
export function useSorts() {
	return useContext(SortsContext)
}

/** Execute an event on the sorts */
export function useSortsDispatch() {
	return useContext(SortsDispatchContext)!
}