

from rest_framework import serializers
from wikiapp.models import Cell, File, Notebook

# Serialize the data before sending it between the database and UI

class NotebookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=120)

    def create(self, validated_data):
        return Notebook.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

    class Meta:
        model = Notebook


class FileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    last_edit = serializers.DateTimeField()
    notebook = NotebookSerializer()

    def create(self, validated_data):
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
    main_file = FileSerializer()

    def create(self, validated_data):
        return Cell.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.data = validated_data.get('data', instance.data)
        instance.uuid = validated_data.get('uuid', instance.uuid)
        instance.main_file = validated_data.get('main_file', instance.main_file)
        instance.save()
        return instance

    class Meta:
        model = Cell

