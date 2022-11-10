import { errors } from "std/http/mod.ts";

/**
 * @param {import("../../musicLibrary/TrackFilesManager.js").TrackFilesManager} trackFilesManager
 * @param {Request} request
 */
export async function tracksPost(trackFilesManager, request) {
	const form = await request.formData();
	const file = form.get("file");
	if (!file) {
		throw new errors.BadRequest("Missing file value");
	}
	if (!(file instanceof File)) {
		throw new errors.BadRequest("File value is not binary data");
	}
	await trackFilesManager.storeFile(file);
	return new Response("ok");
}
