import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Team from 'App/Models/Team'

export default class TrackerResult extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public mapName: string

  @column()
  @belongsTo(() => Team)
  public teamId: BelongsTo<typeof Team>

  @column()
  public opponentTeam: string

  @column()
  public team1_score: number

  @column()
  public team2_score: number

  @column()
  public info: string

  @column()
  public replay_code: string

  @column()
  public vod_link: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
