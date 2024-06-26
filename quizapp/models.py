from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

RIGHT_OPTION_CHOICES=(
    ('option_1','option_1'),
    ('option_2','option_2'),
    ('option_3','option_3'),
    ('option_4','option_4')
)

class Quiz(models.Model):
    name=models.CharField(max_length=100)
    desc=models.CharField(max_length=100)
    performance_threshold=models.IntegerField(default=0)
    gain_points=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return self.name

class QuizQusetions(models.Model):
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,related_name='quiz')
    question=models.CharField(max_length=100)
    option_1=models.CharField(max_length=100)
    option_2=models.CharField(max_length=100)
    option_3=models.CharField(max_length=100)
    option_4=models.CharField(max_length=100)
    right_option=models.CharField(max_length=100,choices=RIGHT_OPTION_CHOICES)
    points=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return f"{self.quiz.name} : {self.question}"

class Result(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='result_user')
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,related_name='result_quiz')
    result_points=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return self.user.username


class Point(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='point_user')
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,related_name='point_quiz')
    points=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return f"{self.user.username} : {self.points}"

class MileStone(models.Model):
    name=models.CharField(max_length=100)
    required_points=models.IntegerField(default=0)
    created_at=models.DateTimeField(default=datetime.now())

    def __str__(self) -> str:
        return self.name

