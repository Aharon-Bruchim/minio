FROM minio/minio

ENV MINIO_ROOT_USER=adminuser
ENV MINIO_ROOT_PASSWORD=strongpassword123

EXPOSE 9000
EXPOSE 9001
VOLUME /data


CMD ["server", "/data", "--console-address", ":9001"]
