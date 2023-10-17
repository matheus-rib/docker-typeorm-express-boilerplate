import { NextFunction, Request, Response } from 'express'

import { Example } from '../entities/Example'
import ApiError from '../errors/ApiError'
import RecordNotFoundError from '../errors/RecordNotFoundError'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { exampleId } = req.params
    const example = await Example.findOne({
      where: { id: parseInt(exampleId) },
    })

    if (!example) throw new RecordNotFoundError('Example', { id: exampleId })

    res.locals.example = example
    next()
  } catch (e) {
    next(new ApiError(e))
  }
}
