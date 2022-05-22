# Сервис аутентификации

Предоставляет api для аутентификации пользователя в приложении

## Эндпоинты

* /registration

    Пример тела запроса:

    ``` json
    {
        "login": "example@mail.com",
        "password": "password",
        "userName": "username"
    }
    ```

* /login

    Пример тела запроса:

    ``` json
    {
        "login": "example@mail.com",
        "password": "password"
    }
    ```
