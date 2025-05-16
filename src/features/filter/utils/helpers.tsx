import { Filter } from "src/types"

/**
 * Gets a filter group by deep diving into the `filters` group using the IDs from `groupIds`
 * @param filterGroup The filter group to search in (usually a `draft` or the main filter group)
 * @param groupIds The IDs to get to the filter group
 * @returns A filter group
 */
export function getGroup(filterGroup: Filter.FilterGroup, groupIds: number[]): Filter.FilterGroup | null {
	console.assert(groupIds.length > 0, "groupIds must have at least one ID")

	if (groupIds.length === 1) {
		if (filterGroup.id === groupIds[0]) return filterGroup
		else return null
	}

	let group = filterGroup
	for (let i = 1; i < groupIds.length; i++) {
		const found = group.group.find(g => g.id === groupIds[i]) as Filter.FilterGroup
		if (typeof found === "undefined") return null
		group = found
	}

	return group
}

/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param id The ID of the filter to find the group of
 * @returns The filter group the filter with ID `id` is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, id: number): Filter.FilterGroup | null
/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param filter The filter to find the group of
 * @returns The filter group the `filter` is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, filter: Filter.Filter): Filter.FilterGroup | null
/**
 * Get the filter group that a filter belongs to
 * @param filterGroup The filter group to search in
 * @param filterOrId The filter or ID of the filter to find the group of
 * @returns The filter group the filter is in
 */
export function getGroupOf(filterGroup: Filter.FilterGroup, filterOrId: Filter.Filter | number): Filter.FilterGroup | null {
	// Get the ID of the filter
	let id
	if (typeof filterOrId === "object") id = filterOrId.id
	else id = filterOrId

	// Check filter group
	if (filterGroup.id === id) return filterGroup

	// Check every group in filter group
	for (const filter of filterGroup.group) {
		if (filter.id === id) return filterGroup
		if (filter.filter === "group") {
			const tempGroup = getGroupOf(filter, id)
			if (tempGroup) return tempGroup
		}
	}

	// Not found
	return null
}

/**
 * Get a filter that exists in a filter group using `groupIds` and `filterId`
 * @param filters The filter group to search in (usually a `draft` or the main filter group)
 * @param groupIds The IDs to get to the filer group that this filter belongs to
 * @param filterId The filter ID we are trying to get
 * @returns A filter if exists; `null` otherwise
 */
export function getFilter<T extends Filter.Filter = Filter.Filter>(filters: Filter.FilterGroup, groupIds: number[], filterId: number): T | null {
	return getGroup(filters, groupIds)?.group?.find(filter => filter.id === filterId) as T ?? null
}

export function findFilter(filterGroup: Filter.FilterGroup, id: number): Filter.Filter | null {
	for (const filter of filterGroup.group) {
		if (filter.id === id) return filter
		if (filter.filter === "group") {
			const found = findFilter(filter, id)
			if (found) return found
		}
	}
	return null
}

export function moveFilter(filterGroup: Filter.FilterGroup, moveId: number, toId: number, position: "before" | "after" | "inside"): void {
	// If the moveId and the toId are equal, then do nothing because the filter is in the correct place
	if (moveId === toId) return

	// Get filter groups and check they exist
	const moveFilterGroup = getGroupOf(filterGroup, moveId)
	if (moveFilterGroup === null) throw new Error("Could not find the filter with ID moveId of \"" + moveId + "\"")
	const toFilterGroup = getGroupOf(filterGroup, toId)
	if (toFilterGroup === null) throw new Error("Could not find the filter with ID toId of \"" + moveId + "\"")

	// Remove the moveFilter filter from the moveFilterGroup
	const moveFilter = moveFilterGroup.group.splice(moveFilterGroup.group.findIndex(filter => filter.id === moveId), 1)[0]

	// Add the moveFilter to the toFilterGroup
	const toFilterIndex = toFilterGroup.group.findIndex(filter => filter.id === toId)
	if (position === "before") toFilterGroup.group.splice(toFilterIndex, 0, moveFilter)
	else if (position === "after") toFilterGroup.group.splice(toFilterIndex + 1, 0, moveFilter)
	else if (position === "inside") {
		const toFilter = toFilterGroup.group[toFilterIndex]
		if (toFilter.filter !== "group") throw new Error("Cannot insert a filter inside a non-filter group")
		toFilter.group.push(moveFilter)
	}
}