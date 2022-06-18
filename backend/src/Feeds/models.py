from django.db import models

# Create your models here.
class Feeds(models.Model):
    store_id = models.CharField(max_length=100)
    sku = models.CharField(max_length=100)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=8)
    date = models.DateTimeField()

    def __str__(self):
        return self.product_name

    class Meta:
        verbose_name_plural = "Feeds"