# Generated by Django 3.2.1 on 2022-07-21 14:26

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('wikiapp', '0005_remove_cell_main_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='cell',
            name='main_file',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='wikiapp.file'),
        ),
        migrations.AlterField(
            model_name='cell',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]