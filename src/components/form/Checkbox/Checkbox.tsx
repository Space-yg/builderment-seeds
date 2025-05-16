import React from "react"
import { FormProps } from "../types"
import "./styles.scss"

export type Props = Omit<FormProps, "label"> & {
	label: string // Make label mandatory
	checked: boolean
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({ label, checked, onChange }: Props) {
	return (
		<label className="bm-checkbox">
			<input type="checkbox" checked={checked} onChange={onChange} />
			<span>{label}</span>
		</label>
	)
}