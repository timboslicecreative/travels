#!/bin/bash
set -x
awslocal s3 mb s3://$CREATE_BUCKET --region region
set +x