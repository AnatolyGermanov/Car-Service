# Generated by Django 5.0 on 2023-12-28 18:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carservice', '0003_alter_user_patronymic'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='document',
            unique_together={('doc_type', 'order')},
        ),
    ]