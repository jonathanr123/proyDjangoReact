from django.conf.urls import url 
from prueba import views 
 
urlpatterns = [ 
    # Estas son las rutas para consulta a la api, pongo localhost/api/(algun nombre)
    url(r'^api/imagen$', views.imagen_list),
    url(r'^api/imagen/(?P<pk>[0-9]+)$', views.imagen_detail),
    url(r'^api/imagen/published$', views.imagen_list_published)
]