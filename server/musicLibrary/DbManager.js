import { DB } from "sqlite";

/**
 * @typedef TrackDbData
 * @property {string} songPath
 * @property {string} title
 * @property {string} artist
 * @property {string} album
 * @property {number} track
 * @property {number} year
 * @property {string} comments
 */

export class DbManager {
	#db;

	/**
	 * @param {string} dbPath
	 */
	constructor(dbPath) {
		this.#db = new DB(dbPath);
		this.#db.execute(`
			CREATE TABLE IF NOT EXISTS tracks (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				songPath TEXT,
				title TEXT,
				artist TEXT,
				album TEXT,
				track INTEGER,
				year INTEGER,
				comments TEXT
			);
		`);
	}

	/**
	 * @param {TrackDbData} data
	 */
	writeTrackData(data) {
		this.#db.query(`INSERT INTO tracks (songPath, title, artist, album, track, year, comments) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
			data.songPath,
			data.title,
			data.artist,
			data.album,
			data.track,
			data.year,
			data.comments,
		]);
	}

	listTracks() {
		const results = this.#db.query(`SELECT songPath, title, artist, album, track, year, comments FROM tracks`);
		return results.map((row) => {
			/** @type {TrackDbData} */
			const trackData = {
				songPath: String(row[0]),
				title: String(row[1]),
				artist: String(row[2]),
				album: String(row[3]),
				track: Number(row[4]),
				year: Number(row[5]),
				comments: String(row[6]),
			};
			return trackData;
		});
	}
}
