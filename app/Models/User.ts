import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import UserProviders from 'App/Models/UserProviders'
import Team from 'App/Models/Team'
import { computed } from '@adonisjs/lucid/build/src/Orm/Decorators'
import Role from 'App/Models/Role'
import Roles from 'App/Enums/Roles'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

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

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  @hasMany(() => UserProviders)
  public providers: HasMany<typeof UserProviders>

  @manyToMany(() => Team, {
    pivotColumns: ['team_role_id'],
  })
  public teams: ManyToMany<typeof Team>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
