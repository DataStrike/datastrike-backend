import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import UserProviders from 'App/Models/UserProviders'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public accessToken: string

  @column()
  public refreshToken: string

  @column()
  public avatarUrl: string

  @hasMany(() => UserProviders)
  public providers: HasMany<typeof UserProviders>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
