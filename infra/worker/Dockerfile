FROM alpine:3.20

RUN apk add --no-cache bash

COPY worker.sh /worker.sh
RUN chmod +x /worker.sh

HEALTHCHECK --interval=5s --timeout=2s --retries=3 \
  CMD test -f /tmp/alive && test $(( $(date +%s) - $(stat -c %Y /tmp/alive) )) -lt 10 || exit 1

CMD ["/worker.sh"]
