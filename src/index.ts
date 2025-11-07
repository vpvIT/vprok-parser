import config from "./config";

import parseCategory from "./lib/parser/parseCategory";
import parseProduct from "./lib/parser/parseProduct";

import saveCategory from "./lib/utils/saveCategory";
import saveProduct from "./lib/utils/saveProduct";

(async () => {
    if (config.mode === 'puppeteer') {
        const product = await parseProduct({
            region: config.region,
            link: config.link
        })
        if (!product) {
            console.log('Ошибка парсинга товара, попробуйте еще раз');
            return;
        }
        return await saveProduct(product);
    }
    const products = await parseCategory(config.link);
    if (!products) {
        console.log('Ошибка парсинга категории, попробуйте еще раз');
        return;
    }
    await saveCategory(products);
})();