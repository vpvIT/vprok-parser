import { Product } from '../../types';

import {writeFile} from 'fs/promises';

const saveProduct = async (product: Product) => {
    let out = `price=${product.price}\n`;
    if(product.oldPrice) out+= `oldPrice=${product.oldPrice}\n`;
    out += `rating=${product.rating}\n`;
    out += `reviewCount=${product.reviewCount}`;
    await writeFile(process.cwd() + '/product.txt', out, {
        flag: 'w+'
    });
}

export default saveProduct;