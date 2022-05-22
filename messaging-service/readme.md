# Сервис отправки сообщений

Предоставляет api для отправки и получения сообщений

## Эндпоинты

* /sendMessage

    Пример тела запроса:

    ``` json
    {
        "userName": "username",
        "messageBody": "your cool message"
    }
    ```

* /getMessages
