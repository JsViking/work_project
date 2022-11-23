# Сайт Север Пресс

## Что это

Новостной сайт Север Пресс.

## Архитектура проекта

* Фреймворк проекта - next.js.
* В рамках next.js применяется SSG и ISR.
* Для стетй менеджмента (store) используется хук useContext.
* Стили - scss
* Бибилиотека HTTP запросов - axios.

## Как запустить проект локально

```bash
yarn
yarn dev
```

```bash
docker-compose up -d --build
```

## Env переменные

* BASE_URL - собственный URL проекта.
* API_URL - URL до API.
* API_V2_URL - URL до API v2.
* HOST_PORT - Порт на хосте, на котором буде доступно приложение.

## Хосты, где запущено приложение

## Структура репозитория

* .vscode - настройки IDE vscode.
* components - каталог простых компонентов.
* feature - каталог комплексных компонентов со сложной логикой.
* hooks - каталог кастомных хуков.
* layout - каталог содержащий базовые структуры страниц.
* libs - каталог содержащий вспомогательные бибилиотеки на js.
* pages - каталог страниц организующих роутинг приложения.
* pages => api - внутреннее апи на node js.
* public - каталог содержащий шрифты, картинки, иконки...
* styles - каталог стилей.

## Внесение изменений в проект

```shell
git pull origin  
git checkout development && git checkout -b feature/<featurename>
```  

комитим нужный код

```shell
git push
```

создаем PR в
<https://git.contentline.ru/CONTENT_LINE/sever_press>

## Владельцы репозитория

[Alexey Karabanov](https://git.contentline.ru/akarabanov)

## Дополнительные материалы

Отсутствуют
