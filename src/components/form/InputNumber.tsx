import React from "react"
import { FormProps } from "./types"

type Props = FormProps & {
	placeholder: string
	value: string | number
	/** When the input changes */
	onChange: React.ChangeEventHandler<HTMLInputElement>
	/** When the input loses focus */
	onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
	max?: string | number | undefined
	min?: string | number | undefined
	decimals?: number | undefined
}

export default function InputNumber(props: Props) {
	return (
		<label className="bm-input">
			<span>{props.label}</span>
			<input type="number" {...props} onBlur={e => {
				// Validate input
				let value = +e.target.value
				if (typeof props.min !== "undefined" && value < +props.min) e.target.value = props.min.toString()
				if (typeof props.max !== "undefined" && value > +props.max) e.target.value = props.max.toString()
				if (typeof props.decimals !== "undefined") e.target.value = (Math.round(value * (10 ** props.decimals)) / (10 ** props.decimals)).toString()

				if (props.onBlur) props.onBlur(e)
			}} />
		</label>
	)
}