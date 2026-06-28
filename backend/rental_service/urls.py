from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/data/', views.data_view, name='api-data'),
    path('api/<str:collection>/', views.collection_view, name='api-collection'),
    path('api/<str:collection>/<path:pk>/', views.item_view, name='api-item'),
]
