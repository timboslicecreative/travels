FROM nginx:latest
WORKDIR /usr/src/app
# Add the nginx template
COPY ./nginx.conf.tpl /etc/nginx/nginx.conf.tpl
# On start inject host and port environment variables into template and output as config
CMD ["/bin/sh" , "-c" , "envsubst '${HOST_NAME} ${HOST_PORT} ${ACCESS_LOG_OUTPUT} ${ERROR_LOG_OUTPUT}' < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
