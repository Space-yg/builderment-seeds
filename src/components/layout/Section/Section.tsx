import React, { ReactNode } from "react"

import "./styles.scss"

type Props = {
	tag: "header" | "main" | "footer" | "aside" | "article" | "section"
	className?: string
	children?: ReactNode
}

export default function Section({ tag: Tag, className, children }: Props) {
	// "Tag" must be capitalized
	return (
		<Tag className={"collection " + (className ?? "")}>
			{children}
		</Tag>
	)
}