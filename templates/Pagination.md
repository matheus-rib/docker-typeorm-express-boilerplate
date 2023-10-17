# Pagination

Pagination middlware adds both pagination and query features to be used.

## Setup:
```ts
const { pagination } = res.locals as LocalsPagination
const { q = {} } = req.query

const [rows, count] = await Examples.getRepository().createQueryBuilder().where(q).skip(pagination.skip).take(pagination.take).orderBy('id', 'ASC').getManyAndCount()

res.json(responsePaginationHandler({ rows, count, pagination }))
```

## Input / Output examples:

### Plain
- Request: `/examples`
- Response:
```json
{
  "page": 1,
  "pages": 1,
  "count": 3,
  "rows": [
    { "foo": "Foo", "bar": 10 },
    { "foo": "Bar", "bar": 20 },
    { "foo": "Baz", "bar": 30 },
  ],
}
```

### Using pages and per-page limitation
- Request: `/examples?page=2&take=1`
- Response:
```json
{
  "page": 2,
  "pages": 3,
  "count": 3,
  "rows": [
    { "foo": "Bar", "bar": 20 },
  ],
}
```

### Using query to filter records
- Request: `/examples?q[foo]=Bar`
- Response:
```json
{
  "page": 1,
  "pages": 1,
  "count": 1,
  "rows": [
    { "foo": "Bar", "bar": 20 },
  ],
}
```
