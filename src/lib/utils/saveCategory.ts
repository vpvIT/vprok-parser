import { ApiProducts } from '../../types';

import { writeFile } from 'fs/promises';

const saveCategory = async (products: ApiProducts) => {
    const formattedProducts: string[] = [];
    for (let i = 0; i < products.length; i++) {
        let out = ``;
        out += `Название товара: ${products[i].name}\n`;
        out += `Ссылка на страницу товара: https://www.vprok.ru${products[i].url}\n`;
        out += `Рейтинг: ${products[i].rating}\n`;
        out += `Количество отзывов: ${products[i].reviews}\n`;
        out += `Цена: ${products[i].price}\n`;
        const discount = products[i].discount || 0;
        if (discount > 0) {
            out += `Акционная цена: ${products[i].price}\n`;
        }
        if (products[i].oldPrice) {
            out += `Цена до акции: ${products[i].oldPrice}\n`;
        }
        if (discount > 0) {
            out += `Размер скидки: ${products[i].discount}\n`;
        }
        formattedProducts.push(out);
    }
    await writeFile(process.cwd() + '/products-api.txt', formattedProducts.join('\n'), {
        flag: 'w+'
    });
}

export default saveCategory;