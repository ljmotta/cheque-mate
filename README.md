# Cheque-Mate
A program that spell a number that is passed as an input on the root route. (`<url>/:input`)

## About implementation
 - Done using Node.js (TypeScript) and Express.js
 - Only a pt-br converter has been implemented.
 - Due to implementation, the input range can be: [-999999,999999]. By default (.env MAX and MIN input) the valid range is: [-99999,99999].
 - The range can be easily expanded, just need to add the auxiliar entries (ex in pt-br: [3, 'milhao'], [4, 'bilhao'], ...) into the `auxiliar` dictionary (`/src/locale/pt-br/dictionary.ts`) and to implement a plural handler (ex in pt-br: 'dois milh*oes*') in the converter (`/src/locale/pt-br/converter.ts`)
*Obs*: The only reason .env was commited is because of the lack of sensitive information.

## Instalation and Running
The application can run on the host machine or on a docker container.

### Standalone
 - 1) Clone this repository:
 `git clone <repo url>`

 - 2) Install the dependecies (two options):
  - 2.1) Install all depedencies (need for development or test propouses):
	`yarn install --production=false`
  - 2.2) Install only necessary depencies for execution (without devDepencies):
	`yarn install --production=true`

 - 3) Execute the program (three options):
  - 3.1) Dev (require 2.1):
	`yarn start:dev`
  - 3.2) Debug (require 2.1):
	`yarn start:debug`
  - 3.3) Prod (require 2.1 or 2.2):
	`yarn start:prod`

### Docker
 - 1) Build the image or download from DockerHub:
  - 1.1) Build (3 options):
	`docker image build --tag=<tag> --target=<target> .`
	 - tag: name of your choice.
	 - target: `dev`, `test` or `prod`.
  - 1.2) Download (3 options):
	 - 1.2.1) Dev:  `docker image pull ljmotta/cheque-mate:dev` 
	 - 1.2.2) Test: `docker image pull ljmotta/cheque-mate:test` 
	 - 1.2.3) Prod: `docker image pull ljmotta/cheque-mate:prod` 
 
 - 2) Run (3 options):
  - 2.1) Dev: `docker container run --rm -it -p 3000:3000 -v $(pwd)/src:/var/www/src ljmotta/cheque-mate:dev`
	- 2.2) Test: `docker container run -it ljmotta/cheque-mate:test`
	- 2.3) Prod: `docker container run -d -p 3000:3000 --name=prod ljmotta/cheque-mate:prod`

## Tests
The tests were made using Mocha.js Chai.js and Supertest (the last one only for integration tests). 

As you probably saw on the previous section (Docker) its possible to execute the tests from a container (useful for a pipeline) or it's possible to execute using yarn, with 3 options:
 - 1) Run all tests: `yarn test:all`
 - 2) Run integration tests: `yarn test:integration`
 - 3) Run unit tests: `yarn test:unit`