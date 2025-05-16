import { Seed, Sort } from "src/types"

export function sortSeeds(seeds: Seed[], sorts: Sort.SortOption[]): Seed[] {
	return [...seeds].sort((seed1, seed2) => {
		// For each sort (in order)
		for (const sort of sorts) {
			// If they are equal, skip
			if (seed1[sort.resource] !== seed2[sort.resource]) {
				// Seed
				if (sort.resource === "sd") {
					if (sort.order === "ascending") return -(seed1.sd.padStart(6, " ") < seed2.sd.padStart(6, " "))
					else return -(seed1.sd.padStart(6, " ") > seed2.sd.padStart(6, " "))
				}
				// Other
				else {
					if (sort.order === "ascending") return seed1[sort.resource] - seed2[sort.resource]
					else return seed2[sort.resource] - seed1[sort.resource]
				}
			}
		}
		return 0
	})
}