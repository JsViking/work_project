FROM node:16.3.0-alpine AS base

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG BASE_URL
ARG API_URL
ARG API_V2_URL

RUN apk add --no-cache libc6-compat
RUN addgroup -S user && adduser -S user

WORKDIR /app


FROM base AS builder

COPY . .

RUN yarn

RUN yarn build


FROM base AS app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chown -R user:user /app/.next

USER user

CMD ["yarn", "start"]
