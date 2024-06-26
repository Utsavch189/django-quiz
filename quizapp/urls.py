from .views import home,profile,logins,logout_user,register,quizplay,rankboard
from django.urls import path
from .api import QuizQuestions,Milestone,TopPointGetterApi


urlpatterns = [
    path('', home, name='home'),
    path('profile/<str:id>', profile, name='profile'),
    path('rank-board/', rankboard, name='rankboard'),
    path('login', logins, name='login'),
    path('logout/', logout_user, name='logout'),
    path('register', register, name='register'),
    path('quiz-play/<int:id>/<str:username>',quizplay,name='quizplay'),
    path('api/questions/<int:id>/<str:username>', QuizQuestions.as_view()),
    path('api/milestone/<str:username>', Milestone.as_view()),
    path('api/rank-board/page=<str:page>&page-size=<str:page_size>', TopPointGetterApi.as_view()),

]