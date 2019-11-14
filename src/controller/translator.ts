import { Request, Response } from 'express'
import { onError, onSuccess } from '../utils/handler'

export function translator(req: Request, res: Response) {
	try {
		const { input } = req.params

		return onSuccess(res, input)
	} catch (error) {
		return onError(res, error)
	}
}
