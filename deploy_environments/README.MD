Download and copy into this directory the following files:
- qa.build.env
- prod.build.env

Then call `make build_qa` or `make build_prod`

This will copy the respective file into the root dir into production.local
and be used as part of the deploy.

Note: any call to npm run build runs with NODE_ENV == "production" and thus
dotenv will use production.local.env to load build time environment variables

