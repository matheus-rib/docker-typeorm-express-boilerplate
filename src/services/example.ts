import { Request } from 'express'
import { DeepPartial } from 'typeorm'

import { Example } from '../entities/Example'
import RequiredError from '../errors/RequiredError'
import responsePaginationHandler, {
  PaginatedResponse,
} from '../utils/responsePaginationHandler'
import { Pagination } from '../utils/types'

function sanitizeRequest(body): DeepPartial<Example> {
  const allowedFields = ['foo', 'bar']

  Object.keys(body).forEach(field => {
    if (!allowedFields.includes(field)) {
      delete body[field]
    }
  })

  return body
}

async function index(
  req: Request,
  pagination: Pagination,
): Promise<PaginatedResponse> {
  const { q = {} } = req.query

  const [rows, count] = await Example.getRepository()
    .createQueryBuilder()
    .where(q)
    .skip(pagination.skip)
    .take(pagination.take)
    .orderBy('id', 'ASC')
    .getManyAndCount()

  return responsePaginationHandler({ rows, count, pagination })
}

async function store(body: any): Promise<Example> {
  const sanitizedBody = sanitizeRequest(body)
  const requiredFields = ['foo', 'bar']

  requiredFields.forEach(field => {
    if (!sanitizedBody[field]) throw new RequiredError(field)
  })

  const example = Example.create(sanitizedBody)
  return example.save()
}

async function edit(body: any, example: Example): Promise<Example> {
  const sanitizedBody = sanitizeRequest(body)

  example.setAttributes(sanitizedBody)
  await example.save()

  return example
}

async function destroy(example: Example): Promise<void> {
  await example.remove()
}

export default {
  index,
  store,
  edit,
  destroy,
}
