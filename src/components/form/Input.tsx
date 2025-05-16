import React from "react"
import { FormProps } from "./types"

type Props = FormProps & {
	placeholder: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({ label, placeholder, value, onChange }: Props) {
	return (
		<label className="bm-input">
			<span>{label}</span>
			<input type="text" placeholder={placeholder} value={value} onChange={onChange} />
		</label>
	)
}