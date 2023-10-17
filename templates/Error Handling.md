# Error Handling

All API's error are structured in default:
```json
{
  "message": "A formatted error text ready to be displayed by the client",
  "code": "errorCode", // easier for debugging
  "additionalProperties": {} // Can be anything, an error stack, payload, entity model, used for detailing each case, the way needed
}
```
