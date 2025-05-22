import React from "react"
import { Sort } from "@/types"
import { Select } from "@/components/form"
import { seedOrderOptions, seedOptions } from "@/data/other"
import { useSorts, useSortsDispatch } from "@/context/SortContext"

type Props = {
	id: number
	className?: string
}

export default function SortOption({ id, className }: Props) {
	const sorts = useSorts()
	const sortsDispatch = useSortsDispatch()

	/** Move a sort option with the keyboard */
	function handleKeydownMoveSort(e: React.KeyboardEvent<HTMLButtonElement>) {
		if (e.key === "ArrowDown") moveSort("down")
		else if (e.key === "ArrowUp") moveSort("up")
	}

	/**
	 * Move a sort option
	 * @param direction Move by a certain direction
	 */
	function moveSort(direction: "up" | "down") {
		sortsDispatch({
			type: "move",
			direction,
			id,
		})
	}

	return (
		<div
			className={"option " + (className ?? "")}
			data-id={id}
		>
			{/* Label */}
			<span className="title">Sort</span>

			{/* Delete filter */}
			<button type="button" className="remove-button" onClick={e => sortsDispatch({
				type: "delete",
				id,
			})}>
				×
			</button>

			{/* Sort fields */}
			<Select
				options={seedOptions}
				value={sorts.find(sort => sort.id === id)!.resource}
				onChange={e => sortsDispatch({
					type: "update",
					id,
					updater(draft) {
						draft.resource = e.target.value as Sort.SortResource
					},
				})}
			/>
			<Select
				options={seedOrderOptions}
				value={sorts.find(sort => sort.id === id)!.order}
				onChange={e => sortsDispatch({
					type: "update",
					id,
					updater(draft) {
						draft.order = e.target.value as Sort.SortOrder
					},
				})}
			/>

			{/* Drag filter */}
			<button
				type="button"
				className="move-button-up"
				onClick={e => moveSort("up")}
				onKeyDown={handleKeydownMoveSort}
			>
				<div></div>
			</button>
			<button
				type="button"
				className="move-button-down"
				onClick={e => moveSort("down")}
				onKeyDown={handleKeydownMoveSort}
			>
				<div></div>
			</button>
		</div>
	)
}