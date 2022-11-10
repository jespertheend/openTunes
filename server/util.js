/**
 * @param {any} json
 */
export function responseJson(json) {
	// @ts-expect-error Remove this function once lib.dom has types for it.
	return Response.json(json);
}
