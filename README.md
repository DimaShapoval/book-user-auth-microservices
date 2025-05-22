# BookHub Microservices

Мікросервісна система для керування користувачами, книгами та авторизацією.  
Реалізована на базі Node.js, Express, MySQL і Docker.  
Усі сервіси взаємодіють через REST API, централізовано проксійовані через Nginx API Gateway.

---

## Стек

- Node.js + Express
- MySQL 8
- Docker + Docker Compose
- Nginx (API Gateway)
- REST API
- Postman (для тестування)

---

## Архітектура

```
localhost:8080
     │
     ▼
 ┌────────────┐
 │  Gateway   │  ← Nginx
 └────┬───────┘
      ▼
 ┌────────────┐   ┌────────────┐   ┌────────────┐
 │ Books API  │   │ Users API  │   │ Auth API   │
 │ :5001      │   │ :5002      │   │ :5003      │
 └────┬───────┘   └────┬───────┘   └────┬───────┘
      ▼               ▼               ▼
                 ┌────────────┐
                 │   MySQL    │
                 └────────────┘
```

---

## Запуск

1. Клонувати репозиторій:

```bash
git clone https://github.com/DimaShapoval/book-user-auth-microservices.git
cd book-user-auth-microservices
```

2.  Запуск сервісів через Docker:

```bash

docker-compose up --build
```
#### У вашому Docker мають з'явитись такі контейнери
![image](https://github.com/user-attachments/assets/44e63945-5a16-4943-8199-f13fee632fc3)


3.  Перевірити доступність:

- Gateway: [http://localhost:8080](http://localhost:8080)

---

##  Приклади запитів (Postman)

###  Створити користувача

```http
POST http://localhost:8080/users
```

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```
### Скріншот тестування
![image](https://github.com/user-attachments/assets/89efc983-9c15-47da-89e3-10e3a6853256)


### Отримати список всіх користувачів

``` http
GET http://localhost:8080/users
```
### Скріншот тестування
![image](https://github.com/user-attachments/assets/fa1ca005-f1bd-4dcd-b624-128ea2e4e2d1)


---

###  Додати книгу

```http
POST http://localhost:8080/books
```

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```
### Скріншот тестування
![image](https://github.com/user-attachments/assets/637c83ba-6c50-4242-9e42-f4e2e221ca7b)


### Подивитись всі книги

``` http
GET http://localhost:8080/books
```
### Скріншот тестування 
![image](https://github.com/user-attachments/assets/bbe6aa0b-e76e-4460-b413-fb357371517f)

---

###  Авторизація

```http
POST http://localhost:8080/login
```

```json
{
  "email": "alice@example.com",
}
```
### Скріншот тестування 
![image](https://github.com/user-attachments/assets/f51651b2-e382-450a-a5bd-6eadfa3672e7)


---

##  Структура проєкту

```
bookhub-microservices/
│
├── books-service/
│   ├── index.js
│   ├── db.js
│   └── Dockerfile
│
├── users-service/
│   ├── index.js
│   ├── db.js
│   └── Dockerfile
│
├── auth-service/
│   ├── index.js
│   ├── db.js
│   └── Dockerfile
│
├── gateway/
│   └── default.conf
│
├── mysql-init/
│   └── init.sql
│
├── wait-for-mysql.sh
├── docker-compose.yml
└── README.md
```

## Nginx як API Gateway

У проєкті використовується **Nginx як зворотний проксі (reverse proxy)**, який виконує роль **API Gateway** між клієнтами та мікросервісами.

### Переваги:

-  Один вхідний порт (`localhost:8080`) для доступу до всіх сервісів
-  Можна централізовано реалізувати авторизацію, логування, rate limiting
-  Можливість пізніше легко додати HTTPS, кешування або балансування навантаження
-  Клієнту не потрібно знати, які порти у кожного сервісу — лише URI типу `/users`, `/books`, `/auth`

 Наприклад: запит `POST /users` перенаправляється на `users-service:5002`, де фактично виконується логіка.

---

## Docker-конфігурація

Проєкт повністю контейнеризований за допомогою **Docker Compose**.  
Кожен мікросервіс запускається окремим контейнером, і всі об'єднані в спільну мережу `app-net`.

### `docker-compose.yml` запускає:

- `books-service` на `5001`
- `users-service` на `5002`
- `auth-service` на `5003`
- `mysql` як база даних на `3306`
- `gateway` (Nginx) на `80`, проброшений у хост на `8080`

### Основні речі в конфігурації:

- **`depends_on`** — забезпечує, щоб MySQL піднімалась перед сервісами
- **`wait-for-mysql.sh`** — скрипт, який чекає, поки база буде доступна перед запуском сервісу
- **`networks`** — всі сервіси спілкуються через віртуальну мережу `app-net`
- **`volumes`** — MySQL має збереження даних і скрипт ініціалізації `init.sql`

---

## Як виглядає проксінг у Nginx (`default.conf`):

```nginx
server {
    listen 80;

    location /books {
        proxy_pass http://books-service:5001;
    }

    location /users {
        proxy_pass http://users-service:5002;
    }

    location /auth {
        proxy_pass http://auth-service:5003;
    }
}
```

---

##  Результат

Після запуску `docker-compose up --build`, ми отримуємо:

- Централізовану точку входу: `http://localhost:8080`
- Всі API-сервіси ізольовані й масштабовані
- Зручне середовище для розробки, тестування, деплою

