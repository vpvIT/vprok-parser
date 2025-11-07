type PuppeteerConfig = {
    mode: 'puppeteer',
    region: string;
    link: string;
};

type ApiConfig = {
    mode: 'api',
    link: string;
};

export type Config = ApiConfig | PuppeteerConfig;

export type Product = {
    price: string;
    oldPrice?: string;
    rating: string;
    reviewCount: string;
};

export type ApiResponse = {
    products: ApiProducts;
};

export type ApiProducts = ApiProduct[];

type ApiProduct = {
  url: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  discount?: number;
}