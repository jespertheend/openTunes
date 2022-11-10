#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net

import { Server as HttpServer } from "std/http/mod.ts";
import { serveDir } from "std/http/file_server.ts";
import { announceAddrs } from "https://deno.land/x/announce_addr@v0.0.2/mod.js";
import { setCwd } from "chdir-anywhere";
import { handler as apiHandler } from "./server/api/main.js";
import { Application } from "./server/Application.js";
setCwd();

const serverApplication = new Application();

const httpServer = new HttpServer({
	async handler(request) {
		const url = new URL(request.url);

		const apiPrefix = "/api/";
		if (url.pathname.startsWith(apiPrefix)) {
			const path = url.pathname.slice(apiPrefix.length);
			return await apiHandler(serverApplication, path, url, request);
		}

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

httpServer.listenAndServe();
announceAddrs(httpServer.addrs);
