from rest_framework import serializers
from .models import *

class MissionSerial(serializers.ModelSerializer):
    class Meta:
        model=Mission
        fields='__all__'

class PEOSerial(serializers.ModelSerializer):
    class Meta:
        model=PEO
        fields='__all__'      

class PLOSerial(serializers.ModelSerializer):
    class Meta:
        model=PLO
        fields='__all__'       


class CLOSerial(serializers.ModelSerializer):
    class Meta:
        model=CLO
        fields='__all__' 

class BookSerial(serializers.ModelSerializer):
    class Meta:
        model=Book_reference
        fields='__all__'   

class MappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mapping
        fields = '__all__'     
        
class AttitudeSerial(serializers.ModelSerializer):
    class Meta:
        model=Attitude
        fields='__all__'   


class SkillSerial(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields='__all__'  


class COSerial(serializers.ModelSerializer):
    class Meta:
        model=CO
        fields='__all__'  

class VisionSerial(serializers.ModelSerializer):
    class Meta:
        model=Vision
        fields='__all__'          
                                       

class KnowledgeSerial(serializers.ModelSerializer):
    class Meta:
        model=Knowledge
        fields='__all__'    

class PloMapPeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PloMapPeo
        fields = '__all__'  

class CloMapPloSerializer(serializers.ModelSerializer):
    class Meta:
        model = CloMapPlo
        fields = '__all__'          

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'         

class SyllabusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Syllabus
        fields = '__all__'       

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'   

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'   

class CourseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInfo
        fields = '__all__'

class OutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outline
        fields = '__all__'

class Outserial(serializers.ModelSerializer):
    class Meta:
        model = OutlineLast
        fields = '__all__'   

