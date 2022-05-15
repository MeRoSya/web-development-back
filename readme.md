# Сервер для проекта студенческого часа

Данное приложение призвано служить бекендом для: [этого приложения](https://github.com/Saibaken/web-development)

## Сборка

Для того, чтобы получить рабочую версию данного приложения необходимо выполнить следующие действия:

1) Склонировать себе исходный код
2) Создать в директории с исходным кодом файл .env, в котором прописать следующие значения:

    ``` shell

        BOT_API_KEY = 'your bot api key'
        LOGIN_CHAT_ID = 'chat id for recieve auth info'
        MESSAGES_CHAT_ID = 'chat id for receive messages'

    ```

3) Вызвать docker-compose up в директории проекта
