/**
 * Extract the resources from an {@link ArrayBuffer}.
 * @param buffer The {@link ArrayBuffer} to get the data from.
 * @returns The resources.
 */
export function getResourcesFromData(buffer: ArrayBuffer | ArrayBufferLike): number[] {
	const dataView = new DataView(buffer)

	const numberOfNibbles = dataView.getUint8(0)
	const secondByte = dataView.getUint8(1).toString(2).padStart(8, "0")
	const numberOfDecimal = parseInt(secondByte.slice(0, 4), 2)

	const resources: number[] = []

	// Odd number of nibbles
	if (numberOfNibbles % 2 === 1) {
		// Get the rest of the nibbles of the first data
		let binary = secondByte.slice(4)
		for (let i = 0; i < (numberOfNibbles - 1) / 2; i++) binary += dataView.getUint8(2 + i).toString(2).padStart(8, "0")
		resources.push(parseInt(binary, 2))

		// Get the rest of the data
		// Reads every 2 data together
		for (let dataByte = 2 + (numberOfNibbles - 1) / 2; dataByte < dataView.byteLength; dataByte += numberOfNibbles) {
			binary = ""
			for (let byte = 0; byte < (numberOfNibbles - 1) / 2; byte++) binary += dataView.getUint8(dataByte + byte).toString(2).padStart(8, "0")
			const middleByte = dataView.getUint8(dataByte + (numberOfNibbles - 1) / 2).toString(2).padStart(8, "0")
			binary += middleByte.slice(0, 4)
			resources.push(parseInt(binary, 2))

			// Stop if there is no second data
			if (dataByte + numberOfNibbles > dataView.byteLength)
				break

			binary = middleByte.slice(4)
			for (let byte = 0; byte < (numberOfNibbles - 1) / 2; byte++) binary += dataView.getUint8(dataByte + (numberOfNibbles - 1) / 2 + 1 + byte).toString(2).padStart(8, "0")
			resources.push(parseInt(binary, 2))
		}
	}
	// Even number of nibbles
	else {
		let middleByte = secondByte
		let binary

		// Get the rest of the data
		for (let dataByte = 1; dataByte < dataView.byteLength - 1; dataByte += numberOfNibbles / 2) {
			binary = middleByte.slice(4)
			for (let byte = 0; byte < (numberOfNibbles / 2) - 1; byte++) binary += dataView.getUint8(dataByte + 1 + byte).toString(2).padStart(8, "0")
			middleByte = dataView.getUint8(dataByte + numberOfNibbles / 2).toString(2).padStart(8, "0")
			resources.push(parseInt(binary + middleByte.slice(0, 4), 2))
		}
	}

	// Convert to decimal if needed
	if (numberOfDecimal) for (let i = 0; i < resources.length; i++) resources[i] = resources[i] / (10 ** numberOfDecimal)

	return resources
}