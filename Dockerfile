FROM oven/bun

WORKDIR /app

COPY . .

RUN bun i

EXPOSE 6001

CMD ["bun", "run", "serve"]