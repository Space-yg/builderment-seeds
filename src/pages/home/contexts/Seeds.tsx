import React, { createContext, useContext } from "react"

import type { Seed } from "!/types"

/** The seeds context */
export const SeedsContext = createContext<Seed[]>([])

/** Get the seeds */
export function useSeeds() {
	return useContext(SeedsContext)
}