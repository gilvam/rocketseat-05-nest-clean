# NestJS

## -

## -

## others

### docker

* both work to start:
    * use file [docker-compose.yml](docker-compose.yml) ``docker compose up -d`` or stop: `docker compose stop`

### prisma

* use to create db ``npx prisma migrate dev``.
* The class use files: [schema.prisma](prisma%2Fschema.prisma)
* show db: ``npx prisma studio``

### Generate private and public key RS256 and base64

```
$ openssl genpkey -algorithm RSA -out private_key.pem
$ base64 -i private_key.pem -o private_key-base64.txt
```

```
$ openssl rsa -pubout -in private_key.pem -out public_key.pem
$ base64 -i public_key.pem -o public_key-base64.txt
```
