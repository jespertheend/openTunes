import * as path from "std/path/mod.ts";
import * as fs from "std/fs/mod.ts";

export class TrackFilesManager {
	#dirPath;
	#dbManager;
	/**
	 * @param {string} dirPath
	 * @param {import("./DbManager.js").DbManager} dbManager
	 */
	constructor(dirPath, dbManager) {
		this.#dirPath = dirPath;
		fs.ensureDirSync(dirPath);
		this.#dbManager = dbManager;
	}

	/**
	 * Stores a new file in the library and writes the metadata to the database.
	 * @param {File} file
	 */
	async storeFile(file) {
		// TODO: put files in directories by album or artist name and handle name clashes.
		const songPath = file.name;
		const destination = path.resolve(this.#dirPath, songPath);
		const buffer = await file.arrayBuffer();
		const intView = new Uint8Array(buffer);
		await Deno.writeFile(destination, intView);
		this.#dbManager.writeTrackData({
			songPath,
			album: "TODO",
			artist: "TODO",
			title: "TODO",
			track: 0,
			comments: "",
			year: 0,
		});
	}
}
