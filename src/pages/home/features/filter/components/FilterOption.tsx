import React, { ReactNode } from "react"
import { useFiltersDispatch } from "!/context/FiltersContext"

type Props = {
	label: string
	children: ReactNode
	id: number
	groupIds: number[]
	className?: string
	removable?: boolean
	movable?: boolean
}

export default function FilterOption({ label, children, id, groupIds, className, removable = true, movable = true }: Props) {
	const filtersDispatch = useFiltersDispatch()

	function handleKeydownMoveFilter(e: React.KeyboardEvent<HTMLButtonElement>) {
		if (e.key === "ArrowDown") moveFilter("down")
		else if (e.key === "ArrowUp") moveFilter("up")
	}

	function moveFilter(direction: "up" | "down") {
		filtersDispatch({
			type: "move",
			direction,
			groupIds,
			id,
		})
	}

	// TODO: Change the label to a dropdown menu
	return (
		<div
			className={"option " + (className ?? "")}
			data-id={id}
		>
			{/* Label of the filter */}
			<span className="title">{label}</span>

			{/* Delete filter */}
			{removable &&
				<button type="button" className="remove-button" onClick={e => filtersDispatch({
					type: "delete",
					groupIds,
					id,
				})}>
					×
				</button>
			}

			{/* Filter fields */}
			{children}

			{/* Drag filter */}
			{movable &&
				<>
					<button
						type="button"
						className="move-button-up"
						onClick={e => moveFilter("up")}
						onKeyDown={handleKeydownMoveFilter}
					>
						<div></div>
					</button>
					<button
						type="button"
						className="move-button-down"
						onClick={e => moveFilter("down")}
						onKeyDown={handleKeydownMoveFilter}
					>
						<div></div>
					</button>
				</>
			}
		</div>
	)
}