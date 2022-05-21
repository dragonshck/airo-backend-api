GCLOUD_PROJECT_ID=menagerie-8e906

gcloud builds submit --tag gcr.io/$GCLOUD_PROJECT_ID/airoapi --project=$GCLOUD_PROJECT_ID

gcloud run deploy airoapi \
--image gcr.io/$GCLOUD_PROJECT_ID/airoapi \
--platform managed \
--region asia-southeast2 \
--allow-unauthenticated \
--project=$GCLOUD_PROJECT_ID