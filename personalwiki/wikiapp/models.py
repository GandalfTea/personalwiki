from django.db import models

""" I am not sure if the cells should be stored separately
    or simply in a single data field. Max theoretical file
    size could get pretty big.
    Each cell is part of a File, and each File is part of a Notebook """


class Notebook(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class File(models.Model):
    name = models.CharField(max_length=200)
    last_edit = models.DateTimeField(auto_now_add=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class Cell(models.Model):
    data = models.TextField()
    idx = models.PositiveIntegerField()
    main_file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.data
