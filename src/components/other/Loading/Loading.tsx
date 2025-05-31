import React from "react"

import "./styles.scss"

type Props = {
	progressText?: never
	progress?: never
} | {
	progressText?: string | undefined
	progress: number
}

export default function Loading({ progress, progressText }: Props) {
	return (
		<div className="loading">
			<div className="loading-animation">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			{progress &&
				<label className="loading-progress">
					<progress max={1} value={progress}></progress>
					{progressText &&
						<span>{progressText}</span>
					}
				</label>
			}
		</div>
	)
}