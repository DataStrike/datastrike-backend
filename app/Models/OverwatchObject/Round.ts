import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Team from 'App/Models/OverwatchObject/Team'
export default class Round extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public start_time: string

  @column()
  public objective_captured: JSON

  @column()
  public objective_progress: JSON

  @hasMany(() => Team)
  public teams: HasMany<typeof Team>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
