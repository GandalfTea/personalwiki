# Generated by Django 3.2.1 on 2022-07-20 13:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wikiapp', '0003_alter_file_last_edit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='last_edit',
        ),
    ]