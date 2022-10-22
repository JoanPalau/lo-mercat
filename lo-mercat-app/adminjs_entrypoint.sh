#/bin/sh

prisma generate
prisma db push --accept-data-loss
prisma db seed

node adminjs/adminjs.js