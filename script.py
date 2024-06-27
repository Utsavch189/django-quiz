import os
import django
from faker import Faker
import random

fake = Faker()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django.setup()

from django.contrib.auth.models import User
from quizapp.models import Result,Point,Quiz
from django.db import transaction

def insert_dummy_users(insert_number=25):
    i=insert_number
    while i>0:
        try:
            full_name=fake.name()
            first_name=full_name.split(" ")[0]
            last_name=full_name.split(" ")[1]
            username=first_name+str(random.randint(111,999))
            password='1234'
            email=fake.email()
            user=User.objects.create_user(username,email,password)
            user.first_name=first_name
            user.last_name=last_name
            user.save()
        except Exception as e:
            print(e)
        i-=1

def create_dummy_results_points():
    users=User.objects.all()
    quiz=Quiz.objects.get(pk=1)
    for user in users:
        if not (user.username=='admin' or user.username=='Utsav123'):
            with transaction.atomic():
                random_score=random.randint(1,14)
                random_points=random.randint(50,450)
                point=Point(user=user,points=random_points)
                point.save()
                result=Result(user=user,quiz=quiz,result_points=random_score)
                result.save()

if __name__=="__main__":
    create_dummy_results_points()