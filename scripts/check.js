#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net --allow-run

import { setCwd } from "chdir-anywhere";
import { generateTypes } from "https://deno.land/x/deno_tsc_helper@v0.1.2/mod.js";

setCwd();
Deno.chdir("..");

await generateTypes({
	importMap: "importmap.json",
	include: [
		"scripts",
		"main.js",
	],
});

const proc = Deno.run({
	cmd: [
		"deno",
		"run",
		"--allow-env",
		"--allow-read",
		"--unstable",
		"npm:typescript@4.8.3/tsc",
		"-p",
		"./jsconfig.json",
	],
});

const status = await proc.status();
if (!status.success) {
	Deno.exit(1);
} else {
	console.log("No type errors!");
}
