from . import views
from django.urls import path

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        #  add your swagger doc title
        title="API's",
        #  version of the swagger doc
        default_version='v1',
        # first line that appears on the top of the doc
        description="",
    ),
    public=True,
)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/feeds/', views.FeedsAPI, name="FeedsAPI"),
    path('api/feeds/add/', views.AddFeedAPI, name="AddFeedAPI"),
    path('api/feeds/add/bulk/', views.BulkAddFeedAPI, name="BulkAddFeedAPI"),
    path('api/feeds/<int:id>/', views.FeedsDetailsAPI, name="FeedsDetailsAPI"),
    path('api/feeds/edit/<int:id>/', views.EditFeedAPI, name="EditFeedAPI"),
    path('api/feeds/delete/<int:id>/', views.DeleteFeedAPI, name="DeleteFeedAPI"),
]
