// Runs the account API and the Vite dev server together, so `npm run dev:all`
// is the one command that gives a working site with working accounts. Either
// process exiting takes the other down, so Ctrl-C leaves nothing behind.
//
// No dependency: two child processes and a shutdown handler is the whole job.

import { spawn } from "node:child_process";

const children = [];
let shuttingDown = false;

function start(name, command, args) {
  const child = spawn(command, args, { stdio: "inherit", shell: false });
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.log(`\n[dev] ${name} exited (${signal ?? code}), stopping the rest`);
    shutdown(typeof code === "number" ? code : 1);
  });
  children.push(child);
  return child;
}

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) child.kill("SIGINT");
  }
  setTimeout(() => process.exit(code), 500).unref();
}

start("api", process.execPath, ["server/index.js"]);
start("vite", process.execPath, ["node_modules/vite/bin/vite.js"]);

for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => shutdown(0));
