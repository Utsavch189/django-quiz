from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Quiz,Result,Point,MileStone
from quizapp.serializer.quiz import QuizWithQuestionSerializer
from django.contrib.auth.models import User
from django.db import transaction
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

class QuizQuestions(APIView):

    def get(self,request,id,username):
        try:
            quiz=Quiz.objects.get(id=id)
            data=QuizWithQuestionSerializer(instance=quiz).data
            return Response({"data":data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self,request,id,username):
        try:
            user=User.objects.get(username=username)
            sumbited_data=request.data
            quiz=Quiz.objects.get(id=id)
            data=QuizWithQuestionSerializer(instance=quiz).data
            questions=data.get('questions')

            result_marks=0
            total_marks=0
            correct_answers=[]

            for question in questions:
                total_marks+=question['points']
                correct_answers.append({
                    "question":question['question'],
                    "answer":question[question['right_option']]
                })

            for key,value in sumbited_data.items():
                for question in questions:
                    if int(question['id'])==int(key) and question['right_option']==value.get('choosed_option') and str(question[value.get('choosed_option')])==str(value.get('value')):
                        result_marks+=question['points']
                        break
                    else:
                        continue
            
            percentage=(int(result_marks)*100)/int(total_marks)
            
            with transaction.atomic():

                if percentage>=data.get('performance_threshold'):
                    if not Point.objects.filter(user=user).exists():
                        point=Point(
                            user=user,
                            points=data.get('gain_points')
                        )
                        point.save()
                    else:
                        point=Point.objects.get(id=Point.objects.filter(user=user)[0].id)
                        point.points=int(data.get('gain_points'))+int(point.points)
                        point.save()
                        
                Result.objects.create(
                    user=user,
                    quiz=quiz,
                    result_points=result_marks
                )

            return Response({"message":"done","threshold":data.get('performance_threshold'),"percentage":percentage,"marks":result_marks,"gain_points":data.get('gain_points') if percentage>=data.get('performance_threshold') else 0,"correct_answers":correct_answers},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Milestone(APIView):

    def get(self,request,username):
        try:
            milestone=MileStone.objects.all()
            data=[{"name":"starting","points":0}]
            for m in milestone:
                data.append(
                    {"name":f"{m.name} ({m.required_points})","points":m.required_points}
                )
            user=User.objects.get(username=username)
            if not Point.objects.filter(user=user).exists():
                return Response({"milestone":data,"points":0},status=status.HTTP_200_OK)
            total_point=Point.objects.filter(user=user)[0].points
            return Response({"milestone":data,"points":total_point},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TopPointGetterApi(APIView):

    def get(self,request,page,page_size):
        try:
            points=Point.objects.all().order_by('-points').values()
            total_data=len(points)
            paginator=Paginator(points,page_size)
            try:
                data=paginator.page(page)
            except PageNotAnInteger:
                data=paginator.page(1)
            except EmptyPage:
                data=[]

            point_ranks=[]

            for d in data:
                user=User.objects.get(pk=d.get('user_id'))
                point_ranks.append(
                    {"id":user.id,"name":user.first_name+" "+user.last_name,"points":d.get("points")}
                )

            return Response({"rankings":point_ranks,"total_records":total_data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
