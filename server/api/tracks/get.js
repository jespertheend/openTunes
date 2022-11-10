import { responseJson } from "../../util.js";

/**
 * @param {import("../../musicLibrary/DbManager.js").DbManager} dbManager
 */
export function tracksGet(dbManager) {
	// TODO: Make this paginated
	const result = dbManager.listTracks();
	return responseJson(result);
}
