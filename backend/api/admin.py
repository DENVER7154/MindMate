from django.contrib import admin
from django.utils.html import format_html
from .models import Note

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "sentiment_score", "created_at")
    readonly_fields=("sentiment_score",)

    def colored_sentiment(self, obj):
        # Color the score: Green for happy, Red for sad, Gold for neutral
        color = "gold"
        if obj.sentiment_score > 0.1:
            color = "green"
        elif obj.sentiment_score < -0.1:
            color = "red"
        return format_html('<b style="color: {};">{}</b>', color, obj.sentiment_score)
    
    colored_sentiment.short_description = "Sentiment Score"
# Register your models here.
