# Pricing Feed Backend

## Prerequisites
1. Postgresql is installed in your system
2. Update Database Name, User, Password from settings.py file
## Project Setup Instructions

1. Go To Project Directory
```
cd backend
```
2. Create Virtual Environment
```
virtualenv env
```
3. Active Virtual Environment
```
env\scripts\activate
```
4. Install Requirements File
```
pip install -r requirements.txt
```
5. Move into src Folder
```
cd src
```
6. Make Migrations
```
python manage.py makemigrations
```
7. Migrate Database
```
python manage.py migrate
```
8. Run Project
```
python manage.py runserver
```
9. Head over to URL
```
http://localhost:8000/
```
