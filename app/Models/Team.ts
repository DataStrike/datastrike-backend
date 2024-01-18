import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import TrackerResult from 'App/Models/TrackerResult'
import Map from 'App/Models/Map'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @hasMany(() => TrackerResult)
  public trackerResults: HasMany<typeof TrackerResult>

  @hasMany(() => Map)
  public maps: HasMany<typeof Map>
}
