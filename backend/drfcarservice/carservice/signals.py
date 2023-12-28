from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models import Max
from .models import Document


@receiver(pre_save, sender=Document)
def set_document_number(sender, instance, **kwargs):
    if not instance.pk:  # Проверяем, что документ новый
        # Получаем максимальный номер документа для данного типа
        max_num = Document.objects.filter(doc_type=instance.doc_type).aggregate(Max('doc_num'))['doc_num__max']
        instance.doc_num = 1 if max_num is None else max_num + 1

