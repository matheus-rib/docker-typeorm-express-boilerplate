import { Column, Entity } from 'typeorm'

import { BaseEntity } from './BaseEntity'

@Entity('examples')
export class Example extends BaseEntity {
  @Column({ type: 'varchar' })
  foo: string

  @Column({ type: 'smallint' })
  bar: number
}
