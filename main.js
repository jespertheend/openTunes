#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net

import { Server } from "std/http/mod.ts";
import { serveDir } from "std/http/file_server.ts";
import { announceAddrs } from "https://deno.land/x/announce_addr@v0.0.2/mod.js";
import { setCwd } from "chdir-anywhere";
setCwd();

const server = new Server({
	async handler(request) {
		/** @type {import("std/http/file_server.ts").ServeDirOptions} */
		const serveDirOpts = {
			quiet: true,
			showDirListing: true,
		};

		return serveDir(request, {
			...serveDirOpts,
			fsRoot: "client/",
		});
	},
});

server.listenAndServe();
announceAddrs(server.addrs);
