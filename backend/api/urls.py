from rest_framework import routers
from .views import *
from django.urls import path

router = routers.DefaultRouter()
router.register(r'api/mission', MissionViewSet, 'mission')
router.register(r'api/peo', PeoViewSet, 'peo')
router.register(r'api/plo', PloViewSet, 'plo')
router.register(r'api/clo', CloViewSet, 'clo')
router.register(r'api/book', BookViewSet, 'book')
router.register(r'api/mappings', MappingViewSet, basename='mapping')
router.register(r'api/attitude',AttitudeViewSet , basename='attitude')
router.register(r'api/skill',SkillViewSet , basename='skill')
router.register(r'api/CO',COViewSet , basename='CO')
router.register(r'api/vision',VisionViewSet , basename='Vision')
router.register(r'api/knowledge',KnowledgeViewSet , basename='Knowledge')
router.register(r'api/plomappeo', PloMapPeoViewSet, basename='plomappeo')
router.register(r'api/clomapplo', CloMapPloViewSet, basename='clomapplo')
router.register(r'api/curriculum', CurriculumViewSet, basename='curriculum')
router.register(r'api/syllabus', SyllabusViewSet, basename='syllabus')
router.register(r'api/course', CourseViewSet, basename='course')
router.register(r'api/assess', AssessViewSet, basename='assess')
router.register(r'api/courseinfo', CourseInfoViewSet, basename='courseinfo')
router.register(r'api/outline', OutlineViewSet, basename='outline')
router.register(r'api/outlinelast', OutlineLastSet, basename='outlinelast')
urlpatterns = [
    *router.urls,
    path('api/outline/<int:outline_id>/clos/', add_clos_to_outline, name='add-clos-to-outline'),
    path('api/outline/<int:outline_id>/skills/', add_skill_to_outline, name='add_skill_to_outline'),
    path('api/outline/<int:outline_id>/knows/', add_know_to_outline, name='add_know_to_outline'),
    path('api/outline/<int:outline_id>/atts/', add_att_to_outline, name='add_att_to_outline'),

]