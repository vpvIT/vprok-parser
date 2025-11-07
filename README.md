# vprok-parser

Парсер сайта vprok.ru с возможностью парсить товар или категорию

## Запуск

Клонируйте проект

```bash
  git clone https://github.com/vpvIT/vprok-parser
```

Перейдите в папку с проектом

```bash
  cd vprok-parser
```

Установите зависимости

```bash
  npm i
```

Соберите проект

```bash
  npm run build
```

Запустите проект коммандой 

```bash
  npm run puppeteer ССЫЛКА_НА_ТОВАР РЕГИОН
```
или

```bash
  npm run api ССЫЛКА_НА_КАТЕГОРИЮ
```