# Cheque-Mate
A program that write in full the number that is used as input.

## About
 - Done using Node.js with TypeScript and Express.js.
 - Only a pt-br converter has been implemented.
 - Due to implementation, the input range can be: [-999999,999999]. By default the valid range is: [-99999,99999].
 - The range can be easily expanded, just need to add the auxiliar entries (ex in pt-br: [3, 'milhao'], [4, 'bilhao'], ...) into the `auxiliar` dictionary (`/src/locale/pt-br/dictionary.ts`) and to implement a plural handler (ex in pt-br: 'dois milh**oes**') in the converter (`/src/locale/pt-br/converter.ts`)

## Usage
The application can run as standalone or on a docker container.

Clone this repository:
 `git clone https://github.com/ljmotta/cheque-mate`

### Setup (optional)
This step is only required for a change in the configurations before running as a standalone application or build a docker image locally.
Create a .env file on the root of the project with the specific infos:
 - PORT: <number> (need to change on docker run command `-p 3000:<number>`)
 - LOCALE: pt-br (only option)
 - MAX_INPUT: <number> (can be set to 999999 without any code modification, default: 99999)
 - MIN_INPUT: <number> (can be set to -999999 without any code modification, default: -99999)

### Standalone
Its necessary to install `yarn` as a first step.

Installation website: https://yarnpkg.com/pt-BR/docs/install#debian-stable

#### Instalation
 - Install all depedencies (need for development or test propouses):
`yarn install --production=false`
 - Install only necessary dependencies for execution (without devDependencies):
`yarn install --production=true`

#### Running
 - Dev (all dependencies required):
`yarn start:dev`
 - Debug (all dependencies required):
`yarn start:debug`
 - Prod (all or just the necessary dependencies):
`yarn start:prod`

### Docker
#### Build (optional)
`docker image build --tag=<tag> --target=<target> .`
 - tag: name of your choice.
 - target: `dev`, `test`, `prod`, `prod-env`.

 *Obs: `prod-env` require .env file*

#### Pull (optional)
 - Dev:  `docker image pull ljmotta/cheque-mate:dev` 
 - Test: `docker image pull ljmotta/cheque-mate:test` 
 - Prod: `docker image pull ljmotta/cheque-mate:prod` 
 
#### Running
##### Direct
 - Dev:
`docker container run --rm -it -p 3000:3000 -v $(pwd)/src:/var/www/src ljmotta/cheque-mate:dev`
 - Test:
`docker container run --rm -it ljmotta/cheque-mate:test`
 - Prod:
`docker container run -d -p 3000:3000 --name=prod ljmotta/cheque-mate:prod`
 - Prod-env (only if was builded locally):
`docker container run -d -p 3000:3000 --name=prod-env <tag>`

##### Compose (Dev or Test)
 - Dev (flag --build necessary when dependencies are updated):
   - Running:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
   - Clean Up:
	 `docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`
 - Test (flag --build necessary when dependencies are updated):
   - Running:
`docker-compose -f docker-compose.yml -f docker-compose.test.yml up`
   - Clean Up:
	 `docker-compose -f docker-compose.yml -f docker-compose.test.yml down`

##### Swarm (Prod or Prod-env)
 - Initialize swarm:

`docker swarm init`

 - Prod:

`docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml <stack name>`

 - Prod-Env (only if was builded locally with --tag=cheque-mate:prod-env):

`docker stack deploy -c docker-compose.yml -c docker-compose.prod-env.yml <stack name>`

Clean Up:

`docker stack rm <stack name>`

`docker swarm leave`

### Examples
Running it's possible to test the application by using `curl` or any other software that make a http request.

|            Request          |                                Response                           |
| --------------------------- | ----------------------------------------------------------------- |
| `curl localhost:3000/0`     | `{ extenso: 'zero' }`                                             |
| `curl localhost:3000/-0`    | `{ extenso: 'zero' }`                                             |
| `curl localhost:3000/1`     | `{ extenso: 'um' }`                                               |
| `curl localhost:3000/100`   | `{ extenso: 'cem' }`                                              |
| `curl localhost:3000/99999` | `{ extenso: 'noventa e nove mil e novecentos e noventa e nove' }` |
| `curl localhost:3000/-1000` | `{ extenso: 'menos mil' }`                                        |

## Tests
The tests were made using Mocha.js, Chai.js and Supertest (the last one only for integration tests). 

As mentioned on the previous section (Docker) its possible to execute the tests from a container (useful for a pipeline) or it's possible to execute using yarn (3 options):
 - Run all tests: `yarn test:all`
 - Run integration tests: `yarn test:integration`
 - Run unit tests: `yarn test:unit`

#### Trivia
Name given due to how cheque's need to be filled: the amount in numbers and his written form.