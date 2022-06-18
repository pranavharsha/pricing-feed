from .models import Feeds
from rest_framework import serializers

class FeedsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feeds
        fields = '__all__'