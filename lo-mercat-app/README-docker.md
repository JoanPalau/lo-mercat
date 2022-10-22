# Run dev

```
docker-compose build
docker-compose up
# (in another terminal while docker is up)
npm run dev
```

# Run production

```
docker-compose -f docker-compose.yml -f docker-compose-next.yml build
docker-compose -f docker-compose.yml -f docker-compose-next.yml up
```