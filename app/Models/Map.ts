import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Map extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: string

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

  @column()
  public data: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
