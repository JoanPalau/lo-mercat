#/bin/sh

prisma generate
prisma db push

node adminjs/adminjs.js