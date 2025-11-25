FROM alpine:latest
RUN apk add --no-cache bash
COPY ../../hydra /hydra
CMD ["/hydra/scripts/start-hydra-dev.sh"]
