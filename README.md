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
![image](https://github.com/user-attachments/assets/5fdb2933-2a74-4f2c-9584-ebfb8c8bb335)



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
