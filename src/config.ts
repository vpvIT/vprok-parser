import regions from "./lib/parser/regions";
import { Config } from "./types";

const args = process.argv.slice(2);

const mode = args[0];

const link = args[1];

const region = args.slice(2).join(' ').toLowerCase();

if(!link.startsWith('https://www.vprok.ru/')) {
    console.error('Не верная ссылка, убедитесь, что она начинается с https://www.vprok.ru/');
    process.exit(0);
}

if(mode === 'puppeteer') {
    if(!link.startsWith('https://www.vprok.ru/product/')) {
        console.error('Не верная ссылка товара, убедитесь, что она начинается с https://www.vprok.ru/product/');
        process.exit(0);
    }
    if(!region) {
        console.error('Не указан регион, укажите и попробуйте снова');
        process.exit(0);
    }
    if(!Object.keys(regions).includes(region)) {
        console.error('Не верно указан регион, проверьте правильность ввода и попробуйте снова');
        process.exit(0);
    }
} else {
    if(!link.startsWith('https://www.vprok.ru/catalog/')) {
        console.error('Не верная ссылка на категорию, убедитесь, что она начинается с https://www.vprok.ru/catalog/');
        process.exit(0);
    }
}

const config: Config = mode === 'puppeteer' ? {
    mode,
    link,
    region
} : {
    mode: 'api',
    link
};

export default config;