FROM frolvlad/alpine-glibc

RUN apk update && apk add libstdc++

COPY app /usr/bin/

CMD [ "app" ]
