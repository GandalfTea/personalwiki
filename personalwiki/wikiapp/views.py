from django.shortcuts import render
from rest_framework import viewsets

from wikiapp.serializers import CellSerializer, FileSerializer, NotebookSerializer
from wikiapp.models import Cell, File, Notebook


class CellViewSet(viewsets.ModelViewSet):
    serializer_class = CellSerializer
    queryset = Cell.objects.all()

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
