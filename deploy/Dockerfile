# Sapiens Note website — static site on a hardened nginx.
#
# nginx-unprivileged + alpine = minimal attack surface and low CVE count:
#   * Alpine base (few packages), official nginx, frequently patched ("stable").
#   * Runs as a NON-ROOT user (uid 101) and listens on 8080 (no root needed).
# Build context is the repo root (see docker-compose.yml).
FROM nginxinc/nginx-unprivileged:stable-alpine

USER root
RUN rm -rf /usr/share/nginx/html/*
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/
USER nginx

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=4s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1
