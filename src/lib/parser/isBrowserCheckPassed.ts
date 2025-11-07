import { Page } from "puppeteer";

const isBrowserCheckPassed = (page: Page) => {
    return page.waitForSelector('.UiSharedInputSearch_inputWrapper__nEdUg', {
        visible: true
    }).catch(err => {
        console.log(err);
        return false;
    }).then(() => true);
}

export default isBrowserCheckPassed;