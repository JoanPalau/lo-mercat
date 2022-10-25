#/bin/sh

prisma generate
prisma db push --accept-data-loss --force-reset
prisma db seed

node adminjs/adminjs.js