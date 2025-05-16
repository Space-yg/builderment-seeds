import React from "react"
import { FormProps } from "./types"

type Props = FormProps & {
	options: string[] | number[] | {
		[optionGroup: string]: string[]
	} | {
		option: string
		value: any
	}[]
	value: string | number
	onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Select({ label, options, value, onChange }: Props) {
	let optionElements: React.JSX.Element[] = []
	if (Array.isArray(options)) optionElements = options.map(option => {
		if (typeof option === "string" || typeof option === "number") return (
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
	// Has option groups (<optgroup>)
	else for (const optionGroup in options) {
		const group: React.JSX.Element[] = options[optionGroup].map(option =>
			<option key={optionGroup + option}>
				{option}
			</option>
		)
		optionElements.push(
			<optgroup key={optionGroup} label={optionGroup}>
				{group}
			</optgroup>
		)
	}

	return (
		<label className="bm-select">
			<select value={value} onChange={onChange}>
				{optionElements}
			</select>
			<span>{label}</span>
		</label>
	)
}