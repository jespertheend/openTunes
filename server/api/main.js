import { errors, isHttpError, Status } from "std/http/mod.ts";
import { tracksGet } from "./tracks/get.js";
import { tracksPost } from "./tracks/post.js";

/**
 * @param {import("../Application.js").Application} application
 * @param {string} path
 * @param {URL} url
 * @param {Request} request
 */
export async function handler(application, path, url, request) {
	try {
		if (path == "tracks") {
			if (request.method == "GET") {
				return await tracksGet(application.dbManager);
			} else if (request.method == "POST") {
				return await tracksPost(application.trackFilesManager, request);
			}
		}
	} catch (e) {
		if (isHttpError(e)) {
			return new Response(e.message, { status: e.status });
		} else {
			throw e;
		}
	}
	return new Response("Not found", {
		status: Status.NotFound,
	});
}
