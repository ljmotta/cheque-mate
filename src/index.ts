import * as dotenv from 'dotenv'
import { setupServer } from './setup/listener'

dotenv.config()

const port = process.env.PORT || '3000'
const app = setupServer()
const server = app.listen(port, () => console.info(`Server listening on port ${port}`))

// Properly shutdown. Node doesn't handle SIGINT or SIGTERM by default.
function shutdown() {
	if (server !== undefined) {
		server.close((err: any) => {
			if (err) {
				console.error(err)
				process.exitCode = 1
			}
			process.exit()
		})
	}
}

process.on('SIGINT', () => {
	console.info('Got SIGINT. Graceful shutdown')
	shutdown()
})

process.on('SIGTERM', () => {
	console.info('Got SIGTERM. Graceful shutdown')
	shutdown()
})
