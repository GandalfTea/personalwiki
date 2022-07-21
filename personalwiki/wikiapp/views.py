from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from wikiapp.serializers import CellSerializer, FileSerializer, NotebookSerializer
from wikiapp.models import Cell, File, Notebook


class CellViewSet(viewsets.ModelViewSet):
    serializer_class = CellSerializer
    queryset = Cell.objects.all()
    lookup_field = 'uuid'

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer


@api_view(['GET', 'PUT', 'DELETE'])
def CellView(request, pk):

    if request.method == 'GET':
        cells = Cell.objects.all()
        serializer = CellSerializer(cells, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CellSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data, status = status.HTTP_201_CREATED )
        print(serializer.errors)
        print("\n\n")
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )

    elif request.method == 'DELETE':
        cell.delete()
        return Response( status=status.HTTP_204_NO_CONTENT )

@api_view(['GET', 'POST'])
def CellsView(request):
    if request.method == 'GET':
        cells = Cell.objects.all()
        serializer = CellSerializer(cells, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serialzier.errors, status=status.HTTP_400_BAD_REQUEST)
