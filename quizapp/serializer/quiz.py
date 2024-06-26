from rest_framework import serializers
from quizapp.models import Quiz,QuizQusetions

class QuizQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model=QuizQusetions
        fields=('id','question','option_1','option_2','option_3','option_4','points','right_option')

class QuizWithQuestionSerializer(serializers.ModelSerializer):

    questions=QuizQuestionSerializer(many=True,source='quiz')

    class Meta:
        model=Quiz
        fields=('id','name','desc','performance_threshold','gain_points','created_at','questions')
    

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model=Quiz
        fields=('id','name','desc','performance_threshold','gain_points','created_at')
    