import React from "react"
import { Link } from "react-router"

import "./styles.scss"

type Props = {}

export default function Highlight({ }: Props) {
	return (
		<div className="highlight">
			<img src={import.meta.env.BASE_URL + "/images/palestinian-flag.png"} alt="Palestinian Flag" />
			<p>Free Palestine. <Link to="/disclaimer">Disclaimer</Link></p>
		</div>
	)
}