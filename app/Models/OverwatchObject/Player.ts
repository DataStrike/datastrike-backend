import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Character from 'App/Models/OverwatchObject/Player'
import Team from 'App/Models/OverwatchObject/Team'

export default class Player extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Character)
  public characters: HasMany<typeof Character>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  @belongsTo(() => Team)
  public teamId: BelongsTo<typeof Team>
}
