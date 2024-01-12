import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserProviders from 'App/Models/UserProviders'
import Team from 'App/Models/Team'
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

  @manyToMany(() => Team)
  public teams: ManyToMany<typeof Team>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
