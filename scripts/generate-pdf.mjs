import { chromium } from "playwright";
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";

const PORT = 4173;
const URL = `http://127.0.0.1:${PORT}/cv`;
const OUTPUT = "dist/resume.pdf";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function startServer() {
  // Serve dist/ as a single-page static server (-s) with no cache (-c-1)
  // Use npx so it works even if http-server is only a devDependency
  const child = spawn(
    "npx",
    ["http-server", "dist", "-p", String(PORT), "-s", "-c-1"],
    { stdio: "ignore" },
  );
  return child;
}

(async () => {
  console.log("Building site...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Starting local server...");
  const server = startServer();
  await sleep(1200);

  console.log("Generating PDF...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `.saide-rail { display: none !important; }`,
  });

  // Optional: force LIGHT theme in the PDF
  // await page.evaluate(() => {
  //   document.documentElement.setAttribute("data-theme", "light");
  //   localStorage.setItem("theme", "light");
  // });
  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: OUTPUT,
    format: "A4",
    printBackground: true,
    // margin: { top: "1mm", right: "1mm", bottom: "1mm", left: "1mm" },
    scale: 1,
  });

  await browser.close();
  server.kill();

  if (fs.existsSync(OUTPUT)) {
    console.log(`Done: ${OUTPUT}`);
  } else {
    console.error("PDF was not created.");
    process.exit(1);
  }
})();
