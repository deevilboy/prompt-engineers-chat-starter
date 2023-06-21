export function removeElementsAfterIndex(arr: any[], index: number) {
	if (index < arr.length - 1) {
		arr.splice(index + 1);
	}
	return arr;
}

export function removeElementsFromIndex(arr: any[], index: number) {
	if (index < arr.length) {
		arr.splice(index);
	}
	return arr;
}
