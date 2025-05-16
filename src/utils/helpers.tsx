import { SmallWorldSettingSize, WorldSettingSize } from "src/types"

/** All base 62 characters */
export const base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" as const

/**
 * Convert a decimal number to base 62
 * @param n The number to convert
 * @returns The base 62 of the number `n`
 */
export function toBase62(n: number): string {
	if (n === 0) return "0"
	var result = []
	while (n > 0) {
		result.push(base62[n % base62.length])
		n = Math.floor(n / base62.length)
	}
	return result.reduce((pre, cur) => cur + pre)
}

/**
 * Convert a small world setting size to a normal world setting size
 * @param smallWorldSettingSize The small world setting size to convert
 * @returns The normal world setting size that the small world setting size represents
 */
export function SmallWorldSettingSizeToWorldSettingSize(smallWorldSettingSize: SmallWorldSettingSize): WorldSettingSize {
	switch (smallWorldSettingSize) {
		case 1: return 50
		case 2: return 75
		case 3: return 100
		case 4: return 150
		case 5: return 200
		default: throw new Error("Unknown small world setting size \"" + smallWorldSettingSize + "\"")
	}
}

/**
 * Swap 2 elements in an array
 * @param arr The array to swap the elements of
 * @param i The index of the first element to swap
 * @param j The index of the second element to swap
 */
export function swap(arr: any[], i: number, j: number) {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

/**
 * Filters an array in place
 * @param arr The array to filter
 * @param predicate The filter function
 * @param thisArg `this`
 * @returns A reference to the array
 */
export function filterInPlace<T>(arr: T[], predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
	replaceInPlace(arr.filter(predicate, thisArg), arr)
	return arr
}

/**
 * Replace all the elements in an array in place
 * @param from The array to replace from
 * @param to The array to replace to
 * @returns A reference to the array replaced to
 */
export function replaceInPlace<T>(from: T[], to: T[]): T[] {
	to.length = from.length

	for (let i = 0; i < from.length; i++) to[i] = from[i]

	return to
}