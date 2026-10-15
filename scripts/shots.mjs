import { chromium } from "playwright";
import path from "path";

const OUT = "C:/Users/DARLAP~1/AppData/Local/Temp/claude/C--My-Web-Sites-webAutos/2e840649-bbfc-402f-9e2b-191bea9509f2/scratchpad/shots";

const pairs = [
  ["home", "http://localhost:8080/", "http://localhost:3001/"],
  ["about", "http://localhost:8080/about-us/", "http://localhost:3001/about-us"],
  ["contact", "http://localhost:8080/contact/", "http://localhost:3001/contact"],
  ["bmw", "http://localhost:8080/bmw/bmw-repair-abu-dhabi/", "http://localhost:3001/bmw/bmw-repair-abu-dhabi"],
  ["service", "http://localhost:8080/car-major-services-in-abu-dhabi/", "http://localhost:3001/car-major-services-in-abu-dhabi"],
  ["blog", "http://localhost:8080/5-reasons-why-car-service-is-important/", "http://localhost:3001/5-reasons-why-car-service-is-important"],
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

for (const [name, oldUrl, newUrl] of pairs) {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("requestfailed", (req) => errors.push("REQFAIL " + req.url() + " " + (req.failure()?.errorText || "")));
  page.on("response", (res) => { if (res.status() >= 400) errors.push("HTTP" + res.status() + " " + res.url()); });

  await page.goto(oldUrl, { waitUntil: "networkidle", timeout: 20000 });
  await page.screenshot({ path: path.join(OUT, `${name}-old.png`), fullPage: true });

  await page.goto(newUrl, { waitUntil: "networkidle", timeout: 20000 });
  await page.screenshot({ path: path.join(OUT, `${name}-new.png`), fullPage: true });

  console.log(name, "errors on new:", errors);
  await page.close();
}

await browser.close();
console.log("done");
