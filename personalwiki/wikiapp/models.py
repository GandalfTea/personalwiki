from django.db import models
from django.utils.translation import ugettext_lazy as _

from taggit.managers import TaggableManager
from taggit.models import GenericUUIDTaggedItemBase, TaggedItemBase

import uuid
from datetime import datetime

class Notebook(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class File(models.Model):
    name = models.CharField(max_length=200)
    last_edit = models.DateTimeField(auto_now=True, null=True)
    url = models.SlugField(max_length=200, unique=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

""" The cell model has both a uuid and a hash :
    The uuid is for identifying if the cell is in the db.
    The hash is for checking in the Front-End whether the data has been changed.                      """

class Cell(models.Model):
    data = models.TextField()
    uuid = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    uhash = models.CharField(max_length=120, default="NULL")
    mf = models.ForeignKey(File, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.data
