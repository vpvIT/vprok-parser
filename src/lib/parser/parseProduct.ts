import { Product } from "../../types";

import getBrowser from "./getBrowser";
import isBrowserCheckPassed from "./isBrowserCheckPassed";

import regions from "./regions";

const parseProduct = async (options: {
    link: string;
    region: string;
}) => {
    try {
        const { browser, page } = await getBrowser();
        const region = regions[options.region as keyof typeof regions];
        await page.setCookie({
            value: String(region),
            expires: Math.floor(Date.now() / 1000) + 86400,
            name: 'region',
            domain: '.vprok.ru',
        });
        await page.goto(options.link, {
            waitUntil: 'networkidle2'
        });
        if (!await isBrowserCheckPassed(page)) {
            await browser.close();
            return null;
        }
        let price = '0';
        const priceElement = await page.$('.Price_price__QzA8L.Price_size_XL__MHvC1').catch(() => null);
        if (priceElement) {
            const priceRaw = await priceElement.evaluate(el => el.textContent);
            if (priceRaw) {
                price = priceRaw.replace(/[^,\d]/g, '').replace(',', '.');
            }
        }
        let rating = '0';
        const ratingElement = await page.$('.ActionsRow_stars__EKt42').catch(() => null);
        if (ratingElement) {
            rating = await ratingElement.evaluate(el => el.textContent) || '0';
        }
        let reviewCount = '0';
        const reviewCountElement = await page.$('.ActionsRow_reviews__AfSj_').catch(() => null);
        if (reviewCountElement) {
            const reviewCountRaw = await reviewCountElement.evaluate(el => el.textContent);
            if (reviewCountRaw) {
                reviewCount = reviewCountRaw.replace(/[^\d]/g, '');
            }
        }
        const product: Product = {
            reviewCount,
            price,
            rating
        };
        const oldPriceElement = await page.$('.Price_price__QzA8L.Price_size_XS__ESEhJ.Price_role_old__r1uT1').catch(() => null);
        if (oldPriceElement) {
            const oldPriceRaw = await oldPriceElement.evaluate(el => el.textContent);
            if (oldPriceRaw) {
                const oldPrice = oldPriceRaw.replace(/[^,\d]/g, '').replace(',', '.');
                product.oldPrice = oldPrice;
            }
        }
        await page.screenshot({
            path: process.cwd() + '/screenshot.jpg'
        });
        await browser.close();
        return product;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default parseProduct;