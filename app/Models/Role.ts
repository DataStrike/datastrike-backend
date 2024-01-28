import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'
export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
}
