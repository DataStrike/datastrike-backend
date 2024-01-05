import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Character from 'App/Models/OverwatchObject/Player'
export default class Player extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public stats: dict<string>

  @column()
  public played_time: list<string>

  @column()
  public kills: list<string>

  @column()
  public deads: list<string>

  @column()
  public ultimate_charged: list<string>

  @column()
  public ultimate_earned: list<string>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
