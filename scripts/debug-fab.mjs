import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3001/about-us", { waitUntil: "networkidle" });
const html = await page.locator(".ea-fab").evaluate((el) => el.outerHTML);
console.log(html);
await page.locator(".ea-fab").screenshot({ path: "C:/Users/DARLAP~1/AppData/Local/Temp/claude/C--My-Web-Sites-webAutos/2e840649-bbfc-402f-9e2b-191bea9509f2/scratchpad/shots/fab-crop.png" });
await browser.close();
