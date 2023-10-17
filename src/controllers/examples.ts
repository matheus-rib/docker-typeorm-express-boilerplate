import { Request, Response } from 'express'

import exampleServices from '../services/example'

async function index(req: Request, res: Response): Promise<void> {
  const examples = await exampleServices.index(req, res.locals.pagination)
  res.json(examples)
}

async function show(req: Request, res: Response): Promise<void> {
  res.json(res.locals.example)
}

async function store(req: Request, res: Response): Promise<void> {
  const example = await exampleServices.store(req.body)
  res.status(201).json(example)
}

async function edit(req: Request, res: Response): Promise<void> {
  const example = await exampleServices.edit(req.body, res.locals.example)
  res.json(example)
}

async function destroy(req: Request, res: Response): Promise<void> {
  await exampleServices.destroy(res.locals.example)
  res.status(204).end()
}

export default {
  index,
  show,
  store,
  edit,
  destroy,
}
