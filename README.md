# Car-Service

## Описание

Информационная система для автосервиса

![image](https://github.com/user-attachments/assets/92dcf48b-8788-4cb1-a2a1-90e844e84c77)

## Технологии

### Backend

- Django
- Django REST Framework
- Djoser

### Frontend

- React

## Запуск backend

1. Создайте вирутальное окружение в папке `backend` командой `python -m venv .venv`
2. Активируйте виртуальное окружение через `.\.venv\Scripts\activate`
3. Скачайте все библиотеки `pip install -r requirements.txt`
4. Перейдите в папку с проектом `drfcarservice`
5. Создайте миграцию `python manage.py makemigrate`
6. Запустите миграцию `python manage.py migrate`
7. Запустите сервер `python manage.py runserver`

## Запуск frontend

1. Установите все бибилиотеки `npm i`
2. Запустите приложение `npm start`
