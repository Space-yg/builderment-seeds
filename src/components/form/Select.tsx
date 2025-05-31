import React from "react"
import { FormProps } from "./types"

type Option = string | number | {
	option: string
	value: any
}

function convertOption(option: Option) {
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
}

type Props = FormProps & {
	options: Option[] | [string, Option[]][]
	value: string | number
	onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Select({ label, options, value, onChange }: Props) {
	let optionElements: React.JSX.Element[] = []
	optionElements = options.map(option => {
		if (Array.isArray(option)) return (
			<optgroup key={option[0]} label={option[0]}>
				{option[1].map(o => convertOption(o))}
			</optgroup>
		)
		else return convertOption(option)
	})

	return (
		<label className="bm-select">
			<select value={value} onChange={onChange}>
				{Array.isArray(options) ? optionElements : options}
			</select>
			{label &&
				<span>{label}</span>
			}
		</label>
	)
}