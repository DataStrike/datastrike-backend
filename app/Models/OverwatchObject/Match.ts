import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Round from 'App/Models/OverwatchObject/Round'
export default class Match extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column.date()
  public date: DateTime

  @column()
  public map_name: string

  @column()
  public map_type: string

  @column()
  public team1_name: string

  @column()
  public team2_name: string

  @column()
  public team1_score: number

  @column()
  public team2_score: number

  @hasMany(() => Round)
  public rounds: HasMany<typeof Round>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
