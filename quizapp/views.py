from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from quizapp.serializer.quiz import QuizSerializer
from .models import Quiz,Result
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
import json

def logins(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('/')
        return render(request,'login.html')
        
    elif request.method == 'POST':

        username=request.POST.get('username').strip()
        password=request.POST.get('password').strip()
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/')

        else:
            messages.error(request, 'Wrong Username or Password')

        if not User.objects.filter(username=username).exists():
            print('user does not exists!')
        

        return render(request,'login.html')
    
    

def register(request):
    if request.method == 'POST':

        username=request.POST.get('username').strip()
        first_name=request.POST.get('first_name').strip()
        last_name=request.POST.get('last_name').strip()
        email=request.POST.get('email').strip()
        password=request.POST.get('password').strip()

        if User.objects.filter(username=username).exists():
            messages.error(request,'user already exists!')
            return render(request,'registration.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request,'email already exists!')
            return render(request,'registration.html')

        try:
            user = User.objects.create_user(username, email, password)
            user.first_name=first_name
            user.last_name=last_name
            user.save()
        except Exception as e:
            messages.error(request,str(e))

        messages.success(request, 'Your Registration is completed.')

        return render(request,'registration.html')
    
    return render(request,'registration.html')

def logout_user(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def home(request):
    quiz=Quiz.objects.all()
    data=QuizSerializer(instance=quiz,many=True).data
    return render(request,'home.html',context={"quizes":data})

@login_required(login_url='login')
def profile(request,id):
    user=User.objects.get(username=request.user.username)
    context={
        "first_name":user.first_name,
        "last_name":user.last_name,
        "email":user.email
    }
    if request.method=='POST':
        data=json.loads(request.body)
        first_name=data.get('first_name').strip()
        last_name=data.get('last_name').strip()
        email=data.get('email').strip()

        if first_name and last_name and email:
            
            if User.objects.filter(email=email).exists():
                return JsonResponse(data={"message":"email exists!","status":400})
            
            try:
                user.first_name=first_name
                user.last_name=last_name
                user.email=email
                user.save()
            except Exception as e:
                messages.error(request,str(e))

        context={
            "first_name":user.first_name,
            "last_name":user.last_name,
            "email":user.email,
            "message":"updated!",
            "status":200
        }
        return JsonResponse(data=context)
    else:
        return render(request,'profile.html',context=context)

@login_required(login_url='login')
def quizplay(request,id,username): 

    context={
        "id":id,
        "eligible":True
    } 

    if not Quiz.objects.filter(id=id).exists():
            return redirect("home")
    
    if not User.objects.filter(username=username).exists():
        return redirect("home")
    
    if Result.objects.filter(user=User.objects.get(username=username)).exists():
        context={
        "id":id,
        "eligible":False
    } 

    return render(request,'quizplay.html',context=context)

@login_required(login_url='login')
def rankboard(request):  

    return render(request,'rankboard.html',context={"id":id})