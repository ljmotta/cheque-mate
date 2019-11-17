import { Request, Response } from 'express'
import { getLanguage } from '../utils/constants'
import { invalidLocale } from '../utils/errors'
import { onError, onSuccess } from '../utils/handler'

/**
 * Dinamic import a module based on LOCALE env variable
 */
async function importLocale() {
	try {
		return await import(`../locale/${getLanguage()}/converter`)
	} catch (error) {
		throw invalidLocale()
	}
}

/**
 * Convert a number input into words.
 *
 * @param req {Request}
 * @param res {Response}
 */
export async function converter(req: Request, res: Response) {
	try {
		const { input } = req.params
		const { negative, positive } = await importLocale()
		// Handle -0 = 0
		const integerInput = (parseInt(input, 10) === 0) ? 0 : parseInt(input, 10)
		const extenso = (integerInput >= 0)
			? positive(integerInput.toString())
			: negative(integerInput.toString())

		return onSuccess(res, extenso)
	} catch (error) {
		return onError(res, error)
	}
}
