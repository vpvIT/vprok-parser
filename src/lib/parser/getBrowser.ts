import { launch } from "puppeteer";

const getBrowser = async () => {
    const browser = await launch({
        headless: false,
        ignoreDefaultArgs: ["--enable-automation"],
        defaultViewport: null,
        args: [
            "--disable-blink-features=AutomationControlled",
            '--start-maximized',
            '--useAutomationExtension=false',
            '--no-sandbox'
        ],
    });
    const page = (await browser.pages())[0];
    await page.evaluate(`Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.' });
window.chrome = { runtime: {} };
Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
Object.defineProperty(navigator, 'languages', { get: () => ['ru-RU', 'ru'] });`);
    return {browser, page};
}

export default getBrowser;