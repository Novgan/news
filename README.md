Для использования скачать, разархивировать, и выполнить следующие команды в терминал(командной строке) 
1. yarn install
2. yarn start -команда которая запустит dev сервер, необходимо для авоматической компиляции scss/ES6 файлов
3. Перейти в браузере по адресу http://localhost:3000
4. Для остановки дев сервера в консоле(терминале) необходимо нажать CTRL+C

Если возникает проблема: 
has been blocked by CORS policy
Добавте переменную cors к actualNewsUrl, latestNewsUrl, imgUrl.
Exemple:
const actualNewsUrl = cors + 'https://renemorozowich.com/wp-json/wp/v2/posts'