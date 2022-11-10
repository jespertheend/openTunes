import { DbManager } from "./musicLibrary/DbManager.js";
import * as path from "std/path/mod.ts";
import * as fs from "std/fs/mod.ts";
import { TrackFilesManager } from "./musicLibrary/TrackFilesManager.js";

export class Application {
	constructor() {
		this.libraryPath = path.resolve("OpenTunes Library/");
		fs.ensureDirSync(this.libraryPath);
		this.dbManager = new DbManager(path.resolve(this.libraryPath, "library.db"));
		this.trackFilesManager = new TrackFilesManager(path.resolve(this.libraryPath, "tracks"), this.dbManager);
	}
}
