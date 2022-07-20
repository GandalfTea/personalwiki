from django.db import models
import uuid

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
    #last_edit = models.DateTimeField(auto_now_add=True, null=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


""" The cell model has both a uuid and a hash :
    The uuid is for identifying if the cell is in the db.
    The hash is for checking in the Front-End whether the data has been changed.                      """

class Cell(models.Model):
    data = models.TextField()
    uuid = models.CharField(unique=True, default=uuid.uuid4, editable=False, max_length=200)
    uhash = models.CharField(max_length=120, default="NULL")
    #main_file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.data
