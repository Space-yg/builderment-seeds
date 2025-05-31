import React, { useCallback } from "react"
import { FormProps } from "../types"

import "./styles.scss"

type Props = FormProps & {
	options: string[] | {
		option: string
		value: any
	}[]
	onSelect: React.ReactEventHandler<HTMLSelectElement>
}

export default function CustomSelect({ label, options, onSelect }: Props) {
	let optionElements: React.JSX.Element[] = options.map(option => {
		if (typeof option === "string") return (
			<option key={option}>
				{option}
			</option>
		)
		else return (
			<option key={option.option} value={option.value}>
				{option.option}
			</option>
		)
	})

	/** Handle on key down event */
	const handleOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLSelectElement>) => {
		// Prevent switching language using arrows
		if (event.key === "ArrowDown" || event.key === "ArrowRight") {
			event.preventDefault()
		}
	}, [])

	return (
		<select className="custom-select" defaultValue={label} onKeyDown={handleOnKeyDown} onInput={e => {
			onSelect(e)
			e.currentTarget.selectedIndex = 0
		}}>
			<option disabled hidden>{label}</option>
			{optionElements}
		</select>
	)
}