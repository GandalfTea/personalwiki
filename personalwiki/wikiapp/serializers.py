

from rest_framework import serializers
from wikiapp.models import Cell, File, Notebook
from django.utils.text import slugify

# Serialize the data before sending it between the database and UI

class NotebookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=120)

    def create(self, validated_data):
        instance = Notebook.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

    class Meta:
        model = Notebook
        fields = ('title')


class FileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    last_edit = serializers.DateTimeField()
    url = serializers.CharField(max_length=200)
    notebook = NotebookSerializer()

    def create(self, validated_data):
        pn = Notebook.objects.filter(title=validated_data['notebook']['title'])
        validated_data['notebook'] = pn[0];
        return File.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.last_edit = validated_data.get('last_edit', instance.last_edit)
        instance.notebook = validated_data.get('notebook', instance.notebook)
        instance.save()
        return instance

    class Meta:
        model = File


class CellSerializer(serializers.Serializer):
    data = serializers.CharField(style={'base_template' : 'textarea.html'})
    uuid = serializers.CharField()
    uhash = serializers.CharField()

    def create(self, validated_data):
        return Cell.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.data = validated_data.get('data', instance.data)
        instance.uuid = validated_data.get('uuid', instance.uuid)
        instance.save()
        return instance

    class Meta:
        model = Cell

