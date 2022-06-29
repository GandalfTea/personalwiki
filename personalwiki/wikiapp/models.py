from django.db import models

""" I am not sure if the cells should be stored separately
    or simply in a single data field. Max theoretical file
    size could get pretty big.

    TODO: Research the CASCADE  """

class Cell(models.Model):
    data = models.CharField(max_length=5000)
    idx = models.PositiveIntegerField()

    def __str__(self):
        return self.idx

class File(models.Model):
    name = models.CharField(max_length=200)
    last_edit = models.DateField()
    cells = models.ForeignKey(Cell, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Notebook(models.Model):
    title = models.CharField(max_length=120)
    files = models.ForeignKey(File, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
