from rest_framework import serializers 
from prueba.models import Imagen
 
 
class ImagenSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Imagen
        fields = ('id',
                  'title',
                  'description',
                  'published')