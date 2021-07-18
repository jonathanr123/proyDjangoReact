from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from prueba.models import Imagen
from prueba.serializers import ImagenSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def imagen_list(request):
    # GET list of imagenes, POST a new imagen, DELETE all imagenes
    # Importante el orden de los metodos
    if request.method == 'GET':
        imagenes = Imagen.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            imagenes = imagenes.filter(title__icontains=title)
        
        imagenes_serializer = ImagenSerializer(imagenes, many=True)
        return JsonResponse(imagenes_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        imagen_data = JSONParser().parse(request)
        imagen_serializer = ImagenSerializer(data=imagen_data)
        if imagen_serializer.is_valid():
            imagen_serializer.save()
            return JsonResponse(imagen_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(imagen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Imagen.objects.all().delete()
        return JsonResponse({'message': '{} Imagen were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
    
 
@api_view(['GET', 'PUT', 'DELETE'])
def imagen_detail(request, pk):
    # find imagen by pk (id)
    try: 
        imagen = Imagen.objects.get(pk=pk) 
    except Imagen.DoesNotExist: 
        return JsonResponse({'message': 'The imagen does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # GET / PUT / DELETE imagen
    if request.method == 'GET': 
        imagen_serializer = ImagenSerializer(imagen) 
        return JsonResponse(imagen_serializer.data)
    
    # elif se utiliza para poder tener mucho if anidados
    elif request.method == 'PUT': 
        imagen_data = JSONParser().parse(request) 
        imagen_serializer = ImagenSerializer(imagen, data=imagen_data) 
        if imagen_serializer.is_valid(): 
            imagen_serializer.save() 
            return JsonResponse(imagen_serializer.data) 
        return JsonResponse(imagen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE': 
        imagen.delete() 
        return JsonResponse({'message': 'Imagen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

        
@api_view(['GET'])
def imagen_list_published(request):
    # GET all published imagenes
    imagenes = Imagen.objects.filter(published=True)
        
    if request.method == 'GET': 
        imagenes_serializer = ImagenSerializer(imagenes, many=True)
        return JsonResponse(imagenes_serializer.data, safe=False)