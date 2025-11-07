import { ApiResponse } from "../../types";

import getBrowser from "./getBrowser";
import isBrowserCheckPassed from "./isBrowserCheckPassed";

import delay from "../utils/delay";

const parseCategory = async (link: string) => {
    try {
        const linkParts = link.split('/');
        const categoryId = linkParts[4];
        if (!categoryId || isNaN(+categoryId)) {
            return null;
        }
        const { browser, page } = await getBrowser();
        await page.goto('https://www.vprok.ru/', {
            waitUntil: 'networkidle2'
        });
        if (!await isBrowserCheckPassed(page)) {
            await browser.close();
            return null;
        }
        await delay(5_000);
        const response: ApiResponse = await page.evaluate((params: {
            categoryId: string;
            link: string;
        }) => {
            return fetch(`https://www.vprok.ru/web/api/v1/catalog/category/${params.categoryId}?sort=popularity_desc&limit=30&page=1`, {
                method: 'POST',
                body: JSON.stringify({
                    noRedirect: true,
                    url: params.link.replace('https://www.vprok.ru/web/api/v1/catalog/', '')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
        }, {
            categoryId,
            link
        });
        await browser.close();
        return response.products;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default parseCategory;