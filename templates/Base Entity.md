# Base Entity

It extends from `Typeorm`'s original `BaseEntity` (creating an abstraction)

## Content

### Fields
- id: number (PrimaryGeneratedColumn)
- createdAt: Date (timestamp column)
- updatedAt: Date (timestamp column)

### Methods
- Creation Date: When creating a new record, it sets the current date and time in `createdAt` field
- Updated Date: When creating a new or updating a record, it sets the current date and time in `updatedAt` field
- Validation: Run validations set on entity before inserting or updating the record. Throws an `API Error` if fails.
- Set Attributes: A quick way to set a full object into an Entity (eg: `example.setAttributes(body)`)
