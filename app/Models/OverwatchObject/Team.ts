import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Player from 'App/Models/OverwatchObject/Player'
import Round from 'App/Models/OverwatchObject/Round'

export default class Team extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Player)
  public players: HasMany<typeof Player>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  @belongsTo(() => Round)
  public roundId: BelongsTo<typeof Round>
}
