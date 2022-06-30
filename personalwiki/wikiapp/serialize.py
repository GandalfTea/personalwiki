

from rest_framework import serializers
from wikiapp.models import Cell, File, Notebook

# Serialize the data before sending it between the database and UI

class CellSerializer(serializers.Serializer):
    data = serializers.CharField(style={'base_template' : 'textarea.html'})
    idx = serializers.IntegerField()

    def create(self, validated_data):
        return Cell.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.data = validated_data.get('data', instance.data)
        instance.idx = validated_data.get('idx', instance.idx)
        instance.save()
        return instance

    class Meta:
        model = Cell


class FileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    last_edit = serializers.DateTimeField()
    #cells = serializers.RelatedField( source='cell') 
    cells = CellSerializer(many=True) 

    def create(self, validated_data):
        return File.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.last_edit = validated_data.get('last_edit', instance.last_edit)
        instance.cells = validated_data.get('cells', instance.cells)
        instance.save()
        return instance

    class Meta:
        model = File


class NotebookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=120)
    #files = serializers.RelatedField( source='file' )
    files = FileSerializer(many=True) 

    def create(self, validated_data):
        return Notebook.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.files = validated_data.get('files', instance.fiels)
        instance.save()
        return instance

    class Meta:
        model = Notebook


