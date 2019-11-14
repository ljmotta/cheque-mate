import { setupServer } from './setup/listener'

const app = setupServer()
const server = app.listen(3000, () => console.info('Server listening on port 3000'))

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
