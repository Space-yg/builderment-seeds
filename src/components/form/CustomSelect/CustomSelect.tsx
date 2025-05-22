import React from "react"
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

	return (
		<select className="custom-select" defaultValue={label} onInput={e => {
			onSelect(e)
			e.currentTarget.selectedIndex = 0
		}}>
			<option disabled>{label}</option>
			{optionElements}
		</select>
	)
}