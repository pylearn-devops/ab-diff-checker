#!/bin/bash

# Define variables
BUCKET_NAME="ab-dev-tools"
REGION="us-east-1"

# Build the React app
npm run build

aws s3 mb s3://$BUCKET_NAME --region $REGION

# Sync the build folder with S3 bucket
aws s3 sync build/ s3://$BUCKET_NAME --delete

# Set public read access for all objects
aws s3 cp s3://$BUCKET_NAME/ s3://$BUCKET_NAME/ --recursive --acl public-read

# Print out the URL of the deployed site
echo "Deployment complete! Access your site at http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
