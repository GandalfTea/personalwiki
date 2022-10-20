from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from wikiapp.serializers import CellSerializer, FileSerializer, NotebookSerializer
from wikiapp.models import Cell, File, Notebook

from django.shortcuts import get_object_or_404

import uuid
from django.utils import timezone

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


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def FileView(request, slug):

    print("\n\n\n")

    # Create new File

    # TODO: Remove the Notebook filter request from here. Already doing one in serializer.
    if request.method == 'PUT':
        parent_notebook = Notebook.objects.filter(title=request.data['parent-title'])[0]
        assert parent_notebook is not None
        nf = File(name=request.data['name'], url=slug, notebook=parent_notebook, last_edit=timezone.now())
        sf = FileSerializer(nf)
        serializer = FileSerializer(data=sf.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print(serializer.errors, end='\n\n')
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Check if File exists
    try:
        f = File.Objects.get(pk=pk)
    except Cell.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        pass
    if request.method == 'PATCH':
        pass
    if request.method == 'DELETE':
        pass

        



@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def CellView(request, pk):

    if request.method == 'PUT':
        cell = Cell(pk, request.data)
        data = { 'uuid': str(pk), 'data': request.data, 'uhash': 'aa'}
        serializer = CellSerializer(cell, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data, status = status.HTTP_201_CREATED )
        print(serializer.errors, end='\n\n')
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )

    try:
        cell = Cell.objects.get(pk=pk);
    except Cell.DoesNotExist:
        cells = Cell.objects.all()
        cell = 1
        for i in cells:
            if(i.pk == pk):
                cell = i
        if cell == 1: 
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        cell.data = request.data

        data = { 'uuid': str(pk), 'data': request.data, 'uhash': 'aa'}
        serializer = CellSerializer(cell, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors, end='\n\n')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = CellSerializer(cell)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        #Cell.objects.filter(pk=request.data['uuid']).delete()
        cell.delete();
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def FileSpecificCellsView(request):
    # BUG: Multiple files with the same name
    print("\n\n", request.data);
    cells = Cell.objects.get(main_file=File.objects.filter(name=request.data['name'])[0])
    serializer = CellSerializer(cells, many=True)
    if request.method == 'GET' or request.method == 'POST':
        print(serializer.data)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def NotebookSpecificFilesView(request):
    print("\n\n", request.data);
    files = File.objects.filter(notebook=Notebook.objects.filter(title=request.data['name'])[0])
    serializer = FileSerializer(files, many=True)
    if request.method == 'GET' or request.method == 'POST':
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)



