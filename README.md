# Cheque-Mate
A program that spell a number that is passed as an input on the root route. (`<url>/:input`)

## About implementation
 - Done using Node.js (TypeScript) and Express.js
 - Only a pt-br converter has been implemented.
 - Due to implementation, the input range can be: [-999999,999999]. By default (.env MAX and MIN input) the valid range is: [-99999,99999].
 - The range can be easily expanded, just need to add the auxiliar entries (ex in pt-br: [3, 'milhao'], [4, 'bilhao'], ...) into the `auxiliar` dictionary (`/src/locale/pt-br/dictionary.ts`) and to implement a plural handler (ex in pt-br: 'dois milh*oes*') in the converter (`/src/locale/pt-br/converter.ts`)
*Obs*: The only reason .env was commited is because of the lack of sensitive information.

## Usage
### Examples
|            Request          |                                Response                           |
| --------------------------- | ----------------------------------------------------------------- |
| `curl localhost:3000/0`     | `{ extenso: 'zero' }`                                             |
| `curl localhost:3000/-0`    | `{ extenso: 'zero' }`                                             |
| `curl localhost:3000/1`     | `{ extenso: 'um' }`                                               |
| `curl localhost:3000/100`   | `{ extenso: 'cem' }`                                              |
| `curl localhost:3000/99999` | `{ extenso: 'noventa e nove mil e novecentos e noventa e nove' }` |
| `curl localhost:3000/-1000` | `{ extenso: 'menos mil' }`                                        |

## Instalation and Running
The application can run on the host machine or on a docker container.

### Standalone
 - Clone this repository:
 `git clone https://github.com/ljmotta/cheque-mate`

 - Install the dependecies (two options):
   - Install all depedencies (need for development or test propouses):
	`yarn install --production=false`
   - Install only necessary depencies for execution (without devDepencies):
	`yarn install --production=true`

 - Execute the program (three options):
   - Dev (require 2.1):
	`yarn start:dev`
   - Debug (require 2.1):
	`yarn start:debug`
   - Prod (require 2.1 or 2.2):
	`yarn start:prod`

### Docker
 - Build the image or download from DockerHub:
   - Build (3 options):
	`docker image build --tag=<tag> --target=<target> .`
	   - tag: name of your choice.
	   - target: `dev`, `test` or `prod`.
   - Download (3 options):
	   - Dev:  `docker image pull ljmotta/cheque-mate:dev` 
	   - Test: `docker image pull ljmotta/cheque-mate:test` 
	   - Prod: `docker image pull ljmotta/cheque-mate:prod` 
 
 - Run (3 options):
   - Dev: `docker container run --rm -it -p 3000:3000 -v $(pwd)/src:/var/www/src ljmotta/cheque-mate:dev`
	 - Test: `docker container run -it ljmotta/cheque-mate:test`
	 - Prod: `docker container run -d -p 3000:3000 --name=prod ljmotta/cheque-mate:prod`

## Tests
The tests were made using Mocha.js Chai.js and Supertest (the last one only for integration tests). 

As you probably saw on the previous section (Docker) its possible to execute the tests from a container (useful for a pipeline) or it's possible to execute using yarn, with 3 options:
 - Run all tests: `yarn test:all`
 - Run integration tests: `yarn test:integration`
 - Run unit tests: `yarn test:unit`