import { DateTime } from 'luxon'
import { column, BaseModel,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Player from 'App/Models/OverwatchObject/Player'

export default class Character extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public stats: JSON

  @column()
  public played_time: JSON

  @column()
  public kills: JSON

  @column()
  public deaths: JSON

  @column()
  public ultimate_charged: JSON

  @column()
  public ultimate_use: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  @belongsTo(() => Player)
  public playerId: BelongsTo<typeof Player>
}
