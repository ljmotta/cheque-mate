import { Response } from 'express'

export function onBadRequest(res: Response, error: Error) {
	console.error(error)
	res.status(400).json({ error, message: error.message })
}

export function onError(res: Response, error: Error) {
	console.error(error)
	res.status(500).json({ error })
}

export function onNotFound(res: Response) {
	res.status(404).json({ error: 'NotFound' })
}

export function onSuccess(res: Response, extenso: string) {
	console.info({ extenso })
	res.status(200).json({ extenso })
}
