# Project mplsart-web
MPLSART.COM Browser Client JS Application

# Development Notes
### Installation
##### Prerequisites
* NodeJS - dowloand and install (https://nodejs.org/en/)
* Google Cloud SDK - only required for deployment

##### Checking out the code
Create a fork of `git@github.com:blainegarrett/mplsart-web.git`

### Running the client code for Dev
In the main project directory, run
```sh
$ npm run dev 
```
***Note:*** This will run the client on `localhost:3000` and use the production (mplsart.com) api server. If you run on a different host/port, you may need to whitelist this on the api server (currently requires a deploy).

### Deploy Instructions to GoogleCloud/AppEngine
#### Build the client and server code
```ssh
npm run build-client
npm run build-server
```
***TODO:*** Re-work `npm run deploy` to alias this with params 

#### Deploy
To manually deploy just the client module (both client and server) code to the `new20160716a` version of the `arts-612` appspot without promoting it to default version (i.e. not LIVE in this case), run:
```ssh
gcloud --project arts-612 app deploy app.yaml --version new20160716a --no-promote
```




### Scratch Notes to Clean Up - Not sure of their validity
#### Old SDK Deploy
>gcloud --project arts-612 preview app deploy app.yaml --version new20160603a --no-promote

#### Deplying the api module ()

#### Deploying the dispatch.yaml for the project
From within mplsart-api directory
`appcfg.py -A <app_id> update_dispatch .`

#### Legacy Commands for API module
Build the react client code for the admin
```ssh
gulp admin-browserify
```

== Deploying dispatch.yaml ==
From within the mplsart-web directory (aka default module)
`appcfg.py -A <app_id> update_dispatch .`

== Deploying the Api Project ==
`appcfg.py update -A mplsart-com -V cooltest ../mplsart-api/app/api.yaml`
`appcfg.py update -A mplsart-com -V cooltest ./app/api.yaml`

== Developing Api ==
`workon mplsart-api`
`pip install -Ur requirements.txt`
`make runserver`

https://cloud.google.com/sdk/gcloud/reference/preview/app/deploy

