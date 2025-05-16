import React, { useEffect, useRef } from "react"
import { FormProps } from "../types"
import "./styles.scss"

export type Props = Omit<FormProps, "label"> & {
	min: number
	max: number
	step?: number
	label?: {
		initialText: string
		valueToText?: string[] | ((value: number) => string)
	}
}

export default function Slider({ min, max, step, label }: Props) {
	const inputRef = useRef<HTMLInputElement>(null)

	function handleInput() {
		const input = inputRef.current!

		// Change track based on input
		const width = (+input.value - (+input.min || 0)) * input.clientWidth / ((+input.max || 100) - (+input.min || 0))
		input.style.background = `linear-gradient(to right, rgb(100, 206, 108) ${width}px, rgba(0, 0, 0, 0.1) ${width}px)`

		// Change label based on input value
		if (label?.valueToText) (input.nextElementSibling as HTMLSpanElement).innerText = typeof label.valueToText === "function" ? label.valueToText(+input.value) : label.valueToText[+input.value - +input.min]
	}
	useEffect(handleInput)

	return (
		<label className="bm-slider">
			<input ref={inputRef} type="range" min={min} max={max} step={step} onInput={handleInput} />
			{label ? <span>{label.initialText}</span> : ""}
		</label>
	)
}