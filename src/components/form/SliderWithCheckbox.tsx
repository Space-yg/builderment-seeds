import React from "react"
import Checkbox, { Props as CheckboxProps } from "./Checkbox/Checkbox"
import Slider, { Props as SliderProps } from "./Slider/Slider"

type Props = {
	checkbox: CheckboxProps
	slider: SliderProps
}

export default function SliderWithCheckbox({ checkbox, slider }: Props) {
	return (
		<div>
			<Checkbox {...checkbox} />
			<Slider {...slider} />
		</div>
	)
}