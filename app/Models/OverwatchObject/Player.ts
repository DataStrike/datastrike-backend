import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Character from 'App/Models/OverwatchObject/Player'
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
}
