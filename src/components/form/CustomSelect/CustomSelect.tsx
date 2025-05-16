import React, { useEffect, useRef } from "react"
import { FormProps } from "../types"
import "./styles.scss"

type Props = FormProps & {
	options: string[] | {
		option: string
		value: any
	}[]
	onSelect?: React.MouseEventHandler<HTMLButtonElement>
}

export default function CustomSelect({ label, options, onSelect }: Props) {
	let optionElements: React.JSX.Element[] = options.map(option => {
		if (typeof option === "string") return (
			<button type="button" key={option} onClick={onSelect}>
				{option}
			</button>
		)
		else return (
			<button type="button" key={option.option} value={option.value} onClick={onSelect}>
				{option.option}
			</button>
		)
	})

	/** Handle clicking an option */
	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		toggleOptions(e.currentTarget)
	}

	/** Show or hide options */
	function toggleOptions(div: HTMLButtonElement) {
		div.classList.toggle("open")
	}

	/** The <div> that represents the custom select */
	const button = useRef<HTMLButtonElement>(null)

	// Do NOT edit the following code.
	// It needs to be like this because when the webpage
	// loads, <React.StrictMode> re-renders all components
	// a second time and runs all useEffect a second time
	function closeSelectDiv(e: MouseEvent) {
		if (e.target === button.current) return
		if (button.current === null) return document.removeEventListener("click", closeSelectDiv)
		button.current!.classList.remove("open")
	}
	useEffect(() => {
		document.removeEventListener("click", closeSelectDiv)
		document.addEventListener("click", closeSelectDiv)
	}, [])

	return (
		<div className="bm-custom-select">
			<button type="button" onClick={handleClick} ref={button}>{label}</button>
			<div>
				{optionElements}
			</div>
		</div>
	)
}